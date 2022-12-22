from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Product
from sqlalchemy.orm import joinedload
from app.forms import ProductForm, UpdateProductForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

# GET all products.
@product_routes.route('')
def get_all_products():
    """
    Get all products and returns them in a list of product dictionaries.
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

# GET product details.
@product_routes.route('/<int:product_id>')
def get_product_details(product_id):
    """
    Get product details.
    """
    product = Product.query.get(product_id)
    return product.to_dict()

# POST a new product.
# @product_routes.route('', methods=['POST'])
# @login_required
# def
