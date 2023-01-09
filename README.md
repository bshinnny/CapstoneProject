# Branazon

Branazon is a full-stack clone of e-commerce giant, Amazon. Currently, Branazon has two features with full CRUD capabilities, products and shopping cart. Users are able to log into and create, add, edit, and delete products and cart items belonging to them.

# Languages
- Python
- Javascript

# Backend
- Flask
- SQLAlchemy
- SQLite

# Frontend
- React
- Redux
- HTML
- CSS

# Hosting
- Render.com

## How to launch the full application locally?
1. Clone this repository.

2. Install dependencies.

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This folder organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv shell, migrate your database, seed your database, and run your Flask app.

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
