from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.models.all_models import FieldExecutive, User

router = APIRouter(prefix="/employees", tags=["Field Executives"])


class EmployeeOut(BaseModel):
    id: int
    user_id: int
    employee_code: str
    designation: str
    assigned_territory: str
    current_lat: Optional[float]
    current_lng: Optional[float]
    battery_level: int
    attendance_status: str
    distance_covered_km: float
    last_location_update: Optional[datetime]
    full_name: str
    phone: str
    email: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class LocationUpdateRequest(BaseModel):
    lat: float
    lng: float
    battery_level: Optional[int] = None


@router.get("", response_model=List[EmployeeOut])
def list_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["administrator"]))
):
    """List all field executives — Admin only."""
    executives = (
        db.query(FieldExecutive)
        .options(joinedload(FieldExecutive.user))
        .all()
    )
    result = []
    for exec_ in executives:
        result.append(EmployeeOut(
            id=exec_.id,
            user_id=exec_.user_id,
            employee_code=exec_.employee_code,
            designation=exec_.designation,
            assigned_territory=exec_.assigned_territory,
            current_lat=exec_.current_lat,
            current_lng=exec_.current_lng,
            battery_level=exec_.battery_level,
            attendance_status=exec_.attendance_status,
            distance_covered_km=exec_.distance_covered_km,
            last_location_update=exec_.last_location_update,
            full_name=exec_.user.full_name,
            phone=exec_.user.phone,
            email=exec_.user.email,
            is_active=exec_.user.is_active,
        ))
    return result


@router.get("/me", response_model=EmployeeOut)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["field_executive"]))
):
    """Get own field executive profile."""
    exec_ = db.query(FieldExecutive).filter(FieldExecutive.user_id == current_user.id).first()
    if not exec_:
        raise HTTPException(status_code=404, detail="Field executive profile not found")
    return EmployeeOut(
        id=exec_.id,
        user_id=exec_.user_id,
        employee_code=exec_.employee_code,
        designation=exec_.designation,
        assigned_territory=exec_.assigned_territory,
        current_lat=exec_.current_lat,
        current_lng=exec_.current_lng,
        battery_level=exec_.battery_level,
        attendance_status=exec_.attendance_status,
        distance_covered_km=exec_.distance_covered_km,
        last_location_update=exec_.last_location_update,
        full_name=current_user.full_name,
        phone=current_user.phone,
        email=current_user.email,
        is_active=current_user.is_active,
    )


@router.put("/{employee_id}/location")
def update_location(
    employee_id: int,
    payload: LocationUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update GPS location for a field executive."""
    exec_ = db.query(FieldExecutive).filter(FieldExecutive.id == employee_id).first()
    if not exec_:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Only the exec themselves or an admin can update location
    user_role = current_user.role.name if current_user.role else ""
    if user_role != "administrator" and exec_.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only update your own location")

    exec_.current_lat = payload.lat
    exec_.current_lng = payload.lng
    exec_.last_location_update = datetime.utcnow()
    if payload.battery_level is not None:
        exec_.battery_level = payload.battery_level
    db.commit()
    return {"success": True, "lat": exec_.current_lat, "lng": exec_.current_lng}
