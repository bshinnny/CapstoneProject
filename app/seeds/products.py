from app.models import db, Product, environment, SCHEMA

def seed_products():
    house1 = Product(
        user_id=1,
        name='TUMS Extra Strength Antacid Tablets for Chewable Heartburn Relief and Acid Indigestion Relief, Assorted Fruit Flavors - 330 Count',
        price=15.99,
        brand='TUMS',
        description='1 bottle containing 330 TUMS Extra Strength Antacid Tablets for Chewable Heartburn Relief and Acid Indigestion Relief in easy to take, delicious assorted fruit flavors (orange, cherry, lime and lemon) for immediate heartburn relief.',
        length=2.0,
        width=2.0,
        height=8.0,
        weight=1.0,
        color='N/A',
        category='Household',
        asin='B0035U184O',
        prime=True,
        image='https://m.media-amazon.com/images/I/71K0fD06CAL._AC_SX679_.jpg'
    )
    house2 = Product(
        user_id=1,
        name='Stardrops - The Pink Stuff - The Miracle All Purpose Cleaning Paste',
        price=5.97,
        brand='Stardrops',
        description='All purpose cleaner.',
        length=3.7,
        width=3.7,
        height=3.7,
        weight=1,
        color='N/A',
        category='Household',
        asin='B1045U1851',
        prime=True,
        image='https://m.media-amazon.com/images/I/71eVL2M23gL._SX522_.jpg'
    )
    house3 = Product(
        user_id=1,
        name='Swiffer Sweeper 2-in-1 Mops for Floor Cleaning, Dry and Wet Multi Surface Floor Cleaner',
        price=15.00,
        brand='Swiffer',
        description='Ensure long-lasting and effective performance.',
        length=24.3,
        width=27.7,
        height=25.3,
        weight=20,
        color='N/A',
        category='Household',
        asin='B1015U1111',
        prime=True,
        image='https://m.media-amazon.com/images/I/71v2cyk8LkL._AC_UL1500_.jpg'
    )
    beauty1 = Product(
        user_id=2,
        name='Colgate Optic White Overnight Teeth Whitening Pen, Teeth Stain Remover to Whiten Teeth, 35 Nightly Treatments, 0.08 Fl Oz',
        price=24.99,
        brand='Colgate',
        description='Whiten teeth while you sleep.',
        length=2.0,
        width=2.0,
        height=5.0,
        weight=1,
        color='N/A',
        category='Beauty',
        asin='B1015U2213',
        prime=True,
        image='https://m.media-amazon.com/images/I/71H2qSWwxqL._SX679_.jpg'
    )
    beauty2 = Product(
        user_id=2,
        name="Burt's Bees 100% Natural Moisturizing Lip Balm, Superfruit - Pink Grapefruit, Mango, Coconut & Pear, Pomegranate - 4 Tubes",
        price=9.99,
        brand="Burt's Bees",
        description="Bursting with all natural flavors, refresh and renew your lips with Burt's Bees Moisturizing Lip Balm in four naturally nourishing flavors: Pink Grapefruit, Mango, Coconut & Pear, and Pomegranate.",
        length=2.0,
        width=2.0,
        height=3.0,
        weight=1,
        color='N/A',
        category='Beauty',
        asin='B1015U2111',
        prime=True,
        image='https://m.media-amazon.com/images/I/715lw6inpRL._SY879_.jpg'
    )
    beauty3 = Product(
        user_id=2,
        name="Gillette Fusion5 Power Mens Razor Blade Refills",
        price=31.99,
        brand="Gilette",
        description="Soft microfins help to smooth and stretch skin before the razor blades preparing hairs to be cut.",
        length=2.0,
        width=2.0,
        height=1.0,
        weight=1,
        color='N/A',
        category='Beauty',
        asin='B1015U3333',
        prime=True,
        image='https://m.media-amazon.com/images/I/818ZIUDwjsL._SX679_.jpg'
    )
    shoes1 = Product(
        user_id=3,
        name="Jordan 1 Lost & Found",
        price=210.00,
        brand="Nike",
        description="A lost & found remake of the classic Air Jordan 1 from 1985",
        length=12.0,
        width=4.0,
        height=5.0,
        weight=2,
        color='N/A',
        category='Fashion',
        asin='B2315U2323',
        prime=True,
        image='https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_892,c_limit/89c121fc-3d07-4de0-aef6-bcc9c2764a2c/air-jordan-1-2022-lost-and-found-chicago-the-inspiration-behind-the-design.jpg'
    )
    shoes2 = Product(
        user_id=3,
        name="Jordan 3 X A Ma Maniere",
        price=210.00,
        brand="Nike",
        description="Jordan's most sought after collaboration with A Ma Maniere",
        length=12.0,
        width=4.0,
        height=5.0,
        weight=2,
        color='N/A',
        category='Fashion',
        asin='A231532323',
        prime=True,
        image='https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/803fed99-f77f-4bae-b30c-443964974c59/women%E2%80%99s-air-jordan-3-sp-a-ma-mani%C3%A9re-release-date.jpg'
    )
    shoes3 = Product(
        user_id=3,
        name="New Balance 550 Aime Leon Dore",
        price=210.00,
        brand="New Balance",
        description="Jordan's most sought after collaboration with A Ma Maniere",
        length=12.0,
        width=4.0,
        height=5.0,
        weight=2,
        color='N/A',
        category='Fashion',
        asin='C111132323',
        prime=True,
        image='https://media.gq.com/photos/619e62c112863e442e3336d5/1:1/w_2000,h_2000,c_limit/view-side-double-05_3200x.jpeg'
    )

    db.session.add(house1)
    db.session.add(house2)
    db.session.add(house3)
    db.session.add(beauty1)
    db.session.add(beauty2)
    db.session.add(beauty3)
    db.session.add(shoes1)
    db.session.add(shoes2)
    db.session.add(shoes3)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
