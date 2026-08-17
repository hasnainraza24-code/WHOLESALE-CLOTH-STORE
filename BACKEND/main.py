from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.products import router as products_router
from database.database import (
    create_products_table,
    insert_sample_products
)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


create_products_table()
insert_sample_products()


@app.get("/")
def home():

    return {
        "message": "Wholesale Cloth Store Backend is running!"
    }


app.include_router(products_router)