from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.models.all_models import Visit, FieldExecutive, ShopOwner, User

router = APIRouter(prefix="/visits", tags=["Field Visits"])


class VisitOut(BaseModel):
    id: int
    executive_id: int
    executive_name: str
    employee_code: str
    shop_id: int
    shop_name: str
    shop_location: str
    purpose: str
    status: str
    check_in_time: Optional[datetime]
    check_out_time: Optional[datetime]
    notes: Optional[str]
    bags_ordered: int
    scheduled_date: datetime

    class Config:
        from_attributes = True


class CheckInRequest(BaseModel):
    notes: Optional[str] = None


class CheckOutRequest(BaseModel):
    notes: Optional[str] = None
    bags_ordered: Optional[int] = 0


def _build_visit_out(v: Visit) -> VisitOut:
    return VisitOut(
        id=v.id,
        executive_id=v.executive_id,
        executive_name=v.executive.user.full_name if v.executive and v.executive.user else "Unknown",
        employee_code=v.executive.employee_code if v.executive else "",
        shop_id=v.shop_id,
        shop_name=v.shop.shop_name if v.shop else "Unknown",
        shop_location=v.shop.market_location if v.shop else "",
        purpose=v.purpose,
        status=v.status,
        check_in_time=v.check_in_time,
        check_out_time=v.check_out_time,
        notes=v.notes,
        bags_ordered=v.bags_ordered,
        scheduled_date=v.scheduled_date,
    )


@router.get("", response_model=List[VisitOut])
def list_visits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List visits — field exec sees own, admin sees all."""
    role_name = current_user.role.name if current_user.role else ""
    query = (
        db.query(Visit)
        .options(
            joinedload(Visit.executive).joinedload(FieldExecutive.user),
            joinedload(Visit.shop),
        )
        .order_by(Visit.scheduled_date.desc())
    )
    if role_name == "field_executive":
        exec_ = db.query(FieldExecutive).filter(FieldExecutive.user_id == current_user.id).first()
        if exec_:
            query = query.filter(Visit.executive_id == exec_.id)
        else:
            return []
    elif role_name not in ["administrator"]:
        return []

    return [_build_visit_out(v) for v in query.all()]


@router.post("/{visit_id}/checkin", response_model=VisitOut)
def check_in_visit(
    visit_id: int,
    payload: CheckInRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["field_executive", "administrator"]))
):
    visit = (
        db.query(Visit)
        .options(
            joinedload(Visit.executive).joinedload(FieldExecutive.user),
            joinedload(Visit.shop),
        )
        .filter(Visit.id == visit_id)
        .first()
    )
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    visit.check_in_time = datetime.utcnow()
    visit.status = "In Progress"
    if payload.notes:
        visit.notes = payload.notes
    db.commit()
    db.refresh(visit)
    return _build_visit_out(visit)


@router.post("/{visit_id}/checkout", response_model=VisitOut)
def check_out_visit(
    visit_id: int,
    payload: CheckOutRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["field_executive", "administrator"]))
):
    visit = (
        db.query(Visit)
        .options(
            joinedload(Visit.executive).joinedload(FieldExecutive.user),
            joinedload(Visit.shop),
        )
        .filter(Visit.id == visit_id)
        .first()
    )
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    visit.check_out_time = datetime.utcnow()
    visit.status = "Completed"
    if payload.notes:
        visit.notes = payload.notes
    if payload.bags_ordered is not None:
        visit.bags_ordered = payload.bags_ordered
    db.commit()
    db.refresh(visit)
    return _build_visit_out(visit)
