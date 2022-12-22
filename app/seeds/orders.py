from app.models import db, Order, environment, SCHEMA

def seed_orders():
    order1 = Order(
        user_id=1,
        product_id=4,
        quantity=1,
        price=15.00,
        street='12023 Stone Gate Way',
        city='Northridge',
        state='California',
        zip_code='91326',
        country='USA'
    )

    db.session.add(order1)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
