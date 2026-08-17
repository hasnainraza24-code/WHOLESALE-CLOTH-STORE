from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.products import router as products_router
from database.database import (
    create_products_table,
    insert_sample_products
)


app = FastAPI()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database Setup
create_products_table()
insert_sample_products()


# Home Route
@app.get("/")
def home():

    return {
        "message": "Wholesale Cloth Store Backend is running!"
    }


# Product Routes
app.include_router(products_router)
