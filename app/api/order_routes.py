from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Product, CartItem, Order
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)


# Add item to user's orders.
@order_routes.route('', methods=['POST'])
@login_required
def post_order():
    """
    Post user's order to orders database.
    """
    cart_items = CartItem.query.options(joinedload(CartItem.product)).filter(CartItem.user_id == current_user.id).all()

    for cart_item in cart_items:
        new_order_instance = Order(
            user_id=current_user.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price=cart_item.product.price*cart_item.quantity,
            street=current_user.street,
            city=current_user.city,
            state=current_user.state,
            zip_code=current_user.zip_code,
            country=current_user.country,
            delivered=True
            )
        db.session.add(new_order_instance)
        db.session.commit()
        db.session.delete(cart_item)
        db.session.commit()

    return {'message': 'Product was successfully ordered.'}

# GET all current user's orders.
@order_routes.route('/current')
@login_required
def get_all_orders():
    """
    Get all orders and returns them in a list of order dictionaries.
    """
    current_user_id = current_user.id
    orders = Order.query.filter(Order.user_id == current_user_id).all()
    return {'Orders': [order.to_dict() for order in orders]}
