from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.models.all_models import Product, User

router = APIRouter(prefix="/products", tags=["Products & Inventory"])


class ProductOut(BaseModel):
    id: int
    name: str
    variety_type: str
    sku: str
    category: str
    image_url: str
    available_stock_bags: int
    germination_rate: str
    purity: str
    maturity_days: Optional[str]
    crop_season: Optional[str]
    availability: str
    description: Optional[str]
    resistance_traits: Optional[str]
    package_sizes: str

    class Config:
        from_attributes = True


class StockUpdateRequest(BaseModel):
    available_stock_bags: int
    availability: Optional[str] = None


@router.get("", response_model=List[ProductOut])
def list_products(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all products. Accessible to all authenticated roles."""
    query = db.query(Product)
    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))
    return query.order_by(Product.category, Product.name).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}/stock")
def update_stock(
    product_id: int,
    payload: StockUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["administrator"]))
):
    """Update product stock — Admin only."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.available_stock_bags = payload.available_stock_bags
    if payload.availability:
        product.availability = payload.availability
    db.commit()
    db.refresh(product)
    return {"success": True, "product_id": product_id, "new_stock": product.available_stock_bags}
