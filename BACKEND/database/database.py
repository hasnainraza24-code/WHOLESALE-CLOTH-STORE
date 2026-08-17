import sqlite3


DATABASE_NAME = "wholesale_store.db"


def get_connection():

    connection = sqlite3.connect(DATABASE_NAME)

    connection.row_factory = sqlite3.Row

    return connection


def create_products_table():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price INTEGER NOT NULL,
            stock INTEGER NOT NULL
        )
    """)

    connection.commit()

    connection.close()


def insert_sample_products():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM products")

    product_count = cursor.fetchone()[0]

    if product_count == 0:

        products = [
            (
                "Men's Cotton Shirt",
                "Shirts",
                450,
                120
            ),
            (
                "Regular Fit Jeans",
                "Jeans",
                650,
                80
            ),
            (
                "Premium T-Shirt",
                "T-Shirts",
                300,
                200
            )
        ]

        cursor.executemany("""
            INSERT INTO products
            (name, category, price, stock)
            VALUES (?, ?, ?, ?)
        """, products)

        connection.commit()

    connection.close()