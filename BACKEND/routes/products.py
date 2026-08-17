from fastapi import APIRouter

from services.product_service import (
    get_all_products,
    search_products_by_name,
    sort_products_by_price,
    create_product,
    update_product,
    delete_product,
    get_product_by_id
)


router = APIRouter()


@router.get("/products")
def get_products():

    products = get_all_products()

    return products


@router.get("/products/search")
def search_products_route(keyword: str):

    results = search_products_by_name(keyword)

    return results


@router.get("/products/sort")
def sort_products_route(order: str = "asc"):

    if order == "desc":

        return sort_products_by_price(
            ascending=False
        )

    return sort_products_by_price(
        ascending=True
    )

@router.post("/products")
def create_product_route(
    name: str,
    category: str,
    price: int,
    stock: int
):

    product = create_product(
        name,
        category,
        price,
        stock
    )

    return product

@router.put("/products/{product_id}")
def update_product_route(
    product_id: int,
    name: str,
    category: str,
    price: int,
    stock: int
):

    product = update_product(
        product_id,
        name,
        category,
        price,
        stock
    )

    if product is None:

        return {
            "message": "Product not found"
        }

    return product

@router.delete("/products/{product_id}")
def delete_product_route(product_id: int):

    deleted = delete_product(product_id)

    if not deleted:

        return {
            "message": "Product not found"
        }

    return {
        "message": "Product deleted successfully",
        "product_id": product_id
    }

@router.get("/products/{product_id}")
def get_product_route(product_id: int):

    product = get_product_by_id(product_id)

    if product is None:

        return {
            "message": "Product not found"
        }

    return product