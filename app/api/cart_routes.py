from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Product, CartItem
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)


# GET user's cart.
@cart_routes.route('')
@login_required
def get_user_cart():
    """
    Get current user's cart.
    """
    current_user_id = current_user.id
    cart_items = CartItem.query.options(joinedload(CartItem.product)).filter(CartItem.user_id == current_user_id).all()
    def cart_item_to_dict(cart_item):
        return {
            "id": cart_item.id,
            "userId": cart_item.user_id,
            "productId": cart_item.product_id,
            "quantity": cart_item.quantity,
            "Product": {
                "id": cart_item.product.id,
                "userId": cart_item.product.user_id,
                "name": cart_item.product.name,
                "price": cart_item.product.price,
                "brand": cart_item.product.brand,
                "description": cart_item.product.description,
                "length": cart_item.product.length,
                "width": cart_item.product.width,
                "height": cart_item.product.height,
                "weight": cart_item.product.weight,
                "color": cart_item.product.color,
                "category": cart_item.product.category,
                "asin": cart_item.product.asin,
                "prime": cart_item.product.prime,
                "imageUrl": cart_item.product.image,
            }
        }
    return {'Cart': [cart_item_to_dict(cart_item) for cart_item in cart_items]}


# Add item to user's cart.
@cart_routes.route('/products/<int:product_id>', methods=['POST'])
@login_required
def post_cart_item(product_id):
    """
    Add a new item to user's cart.
    """
    current_user_id = current_user.id
    product = Product.query.get(product_id)

    if not product:
        return {'errors': 'Product not found.'}, 404

    if product.user_id == current_user_id:
        return {'errors': 'You cannot add your own product.'}, 401

    else:
        new_cart_item = CartItem(user_id=current_user_id, product_id=product_id, quantity=1)

        db.session.add(new_cart_item)
        db.session.commit()

        cart_item = CartItem.query.options(joinedload(CartItem.product)).get(new_cart_item.id)

        def cart_item_to_dict(cart_item):
            return {
                "id": cart_item.id,
                "userId": cart_item.user_id,
                "productId": cart_item.product_id,
                "quantity": cart_item.quantity,
                "Product": {
                    "id": cart_item.product.id,
                    "userId": cart_item.product.user_id,
                    "name": cart_item.product.name,
                    "price": cart_item.product.price,
                    "brand": cart_item.product.brand,
                    "description": cart_item.product.description,
                    "length": cart_item.product.length,
                    "width": cart_item.product.width,
                    "height": cart_item.product.height,
                    "weight": cart_item.product.weight,
                    "color": cart_item.product.color,
                    "category": cart_item.product.category,
                    "asin": cart_item.product.asin,
                    "prime": cart_item.product.prime,
                    "imageUrl": cart_item.product.image,
                }
            }

        return cart_item_to_dict(cart_item)


# DELETE item from user's cart.
@cart_routes.route('/<int:cart_item_id>', methods=['DELETE'])
@login_required
def delete_cart_item(cart_item_id):
    """
    Delete an item from user's cart.
    """
    current_user_id = current_user.id
    cart_item = CartItem.query.get(cart_item_id)

    if not cart_item:
        return {'errors': "Cart doesn't have that item in it."}, 404

    if cart_item.user_id != current_user_id:
        return{'errors': 'You are not authorized to delete this product from this cart.'}, 401

    db.session.delete(cart_item)
    db.session.commit()

    return {'message': 'Product was removed from the cart.'}

# Edit the quantity of a cart item.
@cart_routes.route('/<int:cart_item_id>/quantity', methods=['PUT'])
@login_required
def edit_item_quantity(cart_item_id):
    """
    Edit the quantity of a cart item.
    """
    current_user_id = current_user.id
    cart_item = CartItem.query.options(joinedload(CartItem.product)).get(cart_item_id)

    if not cart_item:
        return {'errors': "Cart doesn't have that item in it."}, 404

    if cart_item.user_id != current_user_id:
        return{'errors': 'You are not authorized to edit the quantity of this item.'}, 401

    data = request.json
    print('JSON REQUEST:', data)

    cart_item.quantity = data
    db.session.commit()

    def cart_item_to_dict(cart_item):
        return {
            "id": cart_item.id,
            "userId": cart_item.user_id,
            "productId": cart_item.product_id,
            "quantity": cart_item.quantity,
            "Product": {
                "id": cart_item.product.id,
                "userId": cart_item.product.user_id,
                "name": cart_item.product.name,
                "price": cart_item.product.price,
                "brand": cart_item.product.brand,
                "description": cart_item.product.description,
                "length": cart_item.product.length,
                "width": cart_item.product.width,
                "height": cart_item.product.height,
                "weight": cart_item.product.weight,
                "color": cart_item.product.color,
                "category": cart_item.product.category,
                "asin": cart_item.product.asin,
                "prime": cart_item.product.prime,
                "imageUrl": cart_item.product.image,
            }
        }

    return cart_item_to_dict(cart_item)



# DELETE item from user's cart.
# @cart_routes.route('/<int:product_id>', methods=['DELETE'])
# @login_required
# def delete_cart_item(product_id):
#     """
#     Delete an item from user's cart.
#     """
#     current_user_id = current_user.id
#     product = Product.query.get(product_id)

#     # print('PRODUCT:', product)

#     if not product:
#         return {'errors': 'Product not found.'}, 404

#     cart_item = CartItem.query.filter((CartItem.user_id == current_user_id),(CartItem.product_id == product_id)).one()

#     # print('CART ITEM:', cart_item)

#     # Maybe refactor error handling.
#     if not cart_item:
#         return {'errors': 'That product is not in your cart.'}, 404

#     # if not current_user_id == product.user_id:
#     #     return {'errors': 'You are not authorized to delete this product from your cart.'}, 401

#     db.session.delete(cart_item)
#     db.session.commit()

#     return {'message': 'Product was removed from the cart.'}
