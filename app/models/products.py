from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    brand = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float, nullable=False)
    width = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    color = db.Column(db.String(30), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    asin = db.Column(db.String(30), nullable=False)
    prime = db.Column(db.Boolean, nullable=False)
    image = db.Column(db.String(255), nullable=False)

    cart_item = db.relationship('CartItem', primaryjoin='Product.id == CartItem.product_id', back_populates='product', cascade='all, delete')
    order = db.relationship('Order', primaryjoin='Product.id == Order.product_id', back_populates='product', cascade='all, delete')
