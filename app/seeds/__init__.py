from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .cart_items import seed_cart_items, undo_cart_items
from .orders import seed_orders, undo_orders
# from app.models import User

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_orders()
        undo_cart_items()
        undo_products()
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_products()
    seed_cart_items()
    seed_orders()
    # Testing on delete cascade.
    # user = User.query.get(1)
    # db.session.delete(user)
    # db.session.commit()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_users()
    # Add other undo functions here.
    # undo_products()
    # undo_cart_items()
    # undo_orders()
    undo_orders()
    undo_cart_items()
    undo_products()
    undo_users()
