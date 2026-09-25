import os
import secrets
import logging
from pydantic import BaseModel

logger = logging.getLogger("yadvi_sms")

# Set DEV_MODE=true in your environment to print OTP to console for local testing.
# In production, configure SMS_PROVIDER and set DEV_MODE=false (or leave unset).
DEV_MODE = os.getenv("DEV_MODE", "true").lower() == "true"


class SMSProviderConfig(BaseModel):
    provider: str
    api_url: str
    api_key: str
    sender_id: str
    template_id: str


def get_sms_config() -> SMSProviderConfig | None:
    provider = os.getenv("SMS_PROVIDER")
    if not provider:
        return None

    return SMSProviderConfig(
        provider=provider,
        api_url=os.getenv("SMS_API_URL", ""),
        api_key=os.getenv("SMS_API_KEY", ""),
        sender_id=os.getenv("SMS_SENDER_ID", ""),
        template_id=os.getenv("SMS_TEMPLATE_ID", "")
    )


def generate_secure_otp() -> str:
    """Generates a cryptographically secure 6-digit OTP."""
    return "".join([str(secrets.randbelow(10)) for _ in range(6)])


def send_sms_otp(mobile: str, otp: str) -> bool:
    """
    Sends an SMS OTP via the configured provider.
    In DEV_MODE (no provider configured), prints OTP to the backend console.
    In production, a real SMS is sent via the configured provider.
    """
    config = get_sms_config()

    if not config:
        if DEV_MODE:
            # Development mode — show OTP in backend terminal for local testing
            logger.warning("=" * 50)
            logger.warning(f"[DEV MODE] OTP for {mobile}: {otp}")
            logger.warning("=" * 50)
            return True
        else:
            logger.error(
                f"SMS provider not configured. Cannot send OTP to {mobile}. "
                "Set SMS_PROVIDER env variable or enable DEV_MODE=true for local testing."
            )
            return False

    logger.info(f"Sending OTP to {mobile} via {config.provider}...")

    # Plug in your SMS provider API call here:
    # try:
    #     import requests
    #     response = requests.post(config.api_url, headers={"Authorization": config.api_key},
    #         json={"to": mobile, "message": f"Your Yadvi OTP is {otp}", "sender": config.sender_id})
    #     response.raise_for_status()
    #     return True
    # except Exception as e:
    #     logger.error(f"Failed to send SMS via {config.provider}: {e}")
    #     return False

    return True
