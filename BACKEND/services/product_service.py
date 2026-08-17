from algorithms.search import search_products
from algorithms.sorting import bubble_sort_by_price

from database.database import get_connection


def get_all_products():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, name, category, price, stock
        FROM products
    """)

    rows = cursor.fetchall()

    connection.close()

    products = [dict(row) for row in rows]

    return products


def search_products_by_name(keyword):

    products = get_all_products()

    results = search_products(
        products,
        keyword
    )

    return results


def sort_products_by_price(ascending=True):

    products = get_all_products()

    sorted_products = bubble_sort_by_price(
        products,
        ascending
    )

    return sorted_products

def create_product(name, category, price, stock):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO products
        (name, category, price, stock)
        VALUES (?, ?, ?, ?)
    """, (
        name,
        category,
        price,
        stock
    ))

    connection.commit()

    product_id = cursor.lastrowid

    connection.close()

    return {
        "id": product_id,
        "name": name,
        "category": category,
        "price": price,
        "stock": stock
    }

def update_product(product_id, name, category, price, stock):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        UPDATE products
        SET
            name = ?,
            category = ?,
            price = ?,
            stock = ?
        WHERE id = ?
    """, (
        name,
        category,
        price,
        stock,
        product_id
    ))

    connection.commit()

    rows_affected = cursor.rowcount

    connection.close()

    if rows_affected == 0:

        return None

    return {
        "id": product_id,
        "name": name,
        "category": category,
        "price": price,
        "stock": stock
    }

def delete_product(product_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        DELETE FROM products
        WHERE id = ?
    """, (product_id,))

    connection.commit()

    rows_affected = cursor.rowcount

    connection.close()

    if rows_affected == 0:

        return False

    return True

def get_product_by_id(product_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, name, category, price, stock
        FROM products
        WHERE id = ?
    """, (product_id,))

    row = cursor.fetchone()

    connection.close()

    if row is None:

        return None

    return dict(row)