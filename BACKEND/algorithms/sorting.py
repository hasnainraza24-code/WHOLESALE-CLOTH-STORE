def bubble_sort_by_price(products, ascending=True):

    products = products.copy()

    n = len(products)

    for i in range(n):

        for j in range(0, n - i - 1):

            if ascending:

                if products[j]["price"] > products[j + 1]["price"]:

                    products[j], products[j + 1] = (
                        products[j + 1],
                        products[j]
                    )

            else:

                if products[j]["price"] < products[j + 1]["price"]:

                    products[j], products[j + 1] = (
                        products[j + 1],
                        products[j]
                    )

    return products