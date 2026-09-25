from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.models.all_models import ShopOwner, User

router = APIRouter(prefix="/shops", tags=["Shop Owners"])


class ShopOut(BaseModel):
    id: int
    user_id: int
    shop_name: str
    dealer_code: str
    market_location: str
    address: str
    lat: Optional[float]
    lng: Optional[float]
    opening_stock_bags: int
    current_stock_bags: int
    primary_demand_crop: Optional[str]
    status: str
    owner_name: str
    phone: str
    email: Optional[str]

    class Config:
        from_attributes = True


@router.get("", response_model=List[ShopOut])
def list_shops(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["administrator", "field_executive"]))
):
    """List shops — Admin sees all, Field Exec sees assigned territory."""
    query = db.query(ShopOwner).options(joinedload(ShopOwner.user))
    
    if current_user.role.name == "field_executive":
        exec_profile = current_user.field_profile
        if exec_profile and exec_profile.assigned_territory:
            # Simple match. In a real app this might be more complex mapping.
            query = query.filter(ShopOwner.market_location == exec_profile.assigned_territory)
            
    shops = query.all()
    return [
        ShopOut(
            id=s.id,
            user_id=s.user_id,
            shop_name=s.shop_name,
            dealer_code=s.dealer_code,
            market_location=s.market_location,
            address=s.address,
            lat=s.lat,
            lng=s.lng,
            opening_stock_bags=s.opening_stock_bags,
            current_stock_bags=s.current_stock_bags,
            primary_demand_crop=s.primary_demand_crop,
            status=s.status,
            owner_name=s.user.full_name,
            phone=s.user.phone,
            email=s.user.email,
        )
        for s in shops
    ]


@router.get("/my", response_model=ShopOut)
def get_my_shop(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["shop_owner"]))
):
    """Get own shop profile — Shop Owner only."""
    shop = db.query(ShopOwner).filter(ShopOwner.user_id == current_user.id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop profile not found")
    return ShopOut(
        id=shop.id,
        user_id=shop.user_id,
        shop_name=shop.shop_name,
        dealer_code=shop.dealer_code,
        market_location=shop.market_location,
        address=shop.address,
        lat=shop.lat,
        lng=shop.lng,
        opening_stock_bags=shop.opening_stock_bags,
        current_stock_bags=shop.current_stock_bags,
        primary_demand_crop=shop.primary_demand_crop,
        status=shop.status,
        owner_name=current_user.full_name,
        phone=current_user.phone,
        email=current_user.email,
    )


@router.get("/{shop_id}", response_model=ShopOut)
def get_shop(
    shop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["administrator", "field_executive"]))
):
    shop = db.query(ShopOwner).options(joinedload(ShopOwner.user)).filter(ShopOwner.id == shop_id).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    return ShopOut(
        id=shop.id,
        user_id=shop.user_id,
        shop_name=shop.shop_name,
        dealer_code=shop.dealer_code,
        market_location=shop.market_location,
        address=shop.address,
        lat=shop.lat,
        lng=shop.lng,
        opening_stock_bags=shop.opening_stock_bags,
        current_stock_bags=shop.current_stock_bags,
        primary_demand_crop=shop.primary_demand_crop,
        status=shop.status,
        owner_name=shop.user.full_name,
        phone=shop.user.phone,
        email=shop.user.email,
    )
