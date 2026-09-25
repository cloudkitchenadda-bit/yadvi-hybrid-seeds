import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("yadvi_db")

Base = declarative_base()

def get_engine():
    # Attempt MySQL first
    mysql_url = f"mysql+mysqlconnector://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
    try:
        engine = create_engine(mysql_url, pool_pre_ping=True)
        # Test connection
        with engine.connect() as conn:
            logger.info("Successfully connected to MySQL Database!")
            return engine
    except Exception as e:
        logger.warning(f"Could not connect to MySQL ({e}). Falling back to local SQLite engine ({settings.SQLITE_DB_PATH}) for seamless zero-downtime operation.")
        sqlite_url = f"sqlite:///{settings.SQLITE_DB_PATH}"
        return create_engine(sqlite_url, connect_args={"check_same_thread": False})

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
