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
    return {'Products': [product.to_dict() for product in products]}

# GET product details.
@product_routes.route('/<int:product_id>')
def get_product_details(product_id):
    """
    Get product details.
    """
    product = Product.query.get(product_id)
    return product.to_dict()

# GET current user's products.
@product_routes.route('/current')
@login_required
def get_user_products():
    """
    Get current user's products.
    """
    current_user_id = current_user.id
    products = Product.query.filter(Product.user_id == current_user_id).all()
    return {'Products': [product.to_dict() for product in products]}



# POST a new product.
@product_routes.route('', methods=['POST'])
@login_required
def post_product():
    """
    Post a new product.
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_user_id = current_user.id

    if form.validate_on_submit():
        name = form.data['name']
        user_id = current_user_id
        price = form.data['price']
        brand = form.data['brand']
        description = form.data['description']
        length = form.data['length']
        width = form.data['width']
        height = form.data['height']
        weight = form.data['weight']
        color = form.data['color']
        category = form.data['category']
        asin = form.data['asin']
        prime = form.data['prime']
        image = form.data['image']

        new_product = Product(name=name, user_id=user_id, price=price, brand=brand, description=description, length=length, width=width, height=height, weight=weight, color=color, category=category, asin=asin, prime=prime, image=image)

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# EDIT an existing product.
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    """
    Update an existing product.
    """
    form = UpdateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_user_id = current_user.id
    product = Product.query.get(product_id)

    if not product:
        return {'errors': 'Product not found.'}, 404

    if not current_user_id == product.user_id:
        return {'errors': 'You are not authorized to edit this product.'}, 401

    if product and form.validate_on_submit():
        product.name = form.data['name']
        product.price = form.data['price']
        product.brand = form.data['brand']
        product.description = form.data['description']
        product.length = form.data['length']
        product.width = form.data['width']
        product.height = form.data['height']
        product.weight = form.data['weight']
        product.color = form.data['color']
        product.category = form.data['category']
        product.asin = form.data['asin']
        product.prime = form.data['prime']
        product.image = form.data['image']

        db.session.commit()

        return product.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE a product.
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    """
    Delete a product.
    """
    current_user_id = current_user.id
    product = Product.query.get(product_id)

    if not product:
        return {'errors': 'Product not found.'}, 404

    if not current_user_id == product.user_id:
        return {'errors': 'You are not authorized to edit this product.'}, 401

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product was removed from the catalog.'}
