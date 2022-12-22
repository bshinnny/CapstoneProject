from app.models import db, CartItem, environment, SCHEMA

def seed_cart_items():
    cart1 = CartItem(
        user_id=1,
        product_id=5,
        quantity=1
    )
    cart2 = CartItem(
        user_id=1,
        product_id=6,
        quantity=1
    )
    cart3 = CartItem(
        user_id=2,
        product_id=8,
        quantity=1
    )

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()

def undo_cart_items():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
        else:
            db.session.execute("DELETE FROM cart_items")

        db.session.commit()
