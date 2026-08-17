def search_products(products, keyword):

    results = []

    keyword = keyword.lower()

    for product in products:

        product_name = product["name"].lower()

        if keyword in product_name:

            results.append(product)

    return results