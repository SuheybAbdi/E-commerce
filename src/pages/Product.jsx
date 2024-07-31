import axios from "axios";
import React, { useEffect, useState } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  console.log("searchQuery", searchQuery);

  const apiData = async () => {
    setLoading(true);
    try {
      const finalData = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setData(finalData.data);
      console.log("Categories:");
      // setSearch(finalData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  console.log("data", data);

  useEffect(() => {
    apiData();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="mt-4 d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
          <Spinner animation="grow" /> &nbsp; &nbsp;
        </div>
      </>
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterProducts = (categoryName) => {
    setCategoryFilter(categoryName.toLowerCase());
    setSearchQuery(""); // Clear the search input  };
  };

  const filteredData = data.filter((product) => {
    const matchesSearchQuery =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategoryFilter = categoryFilter
      ? product.category.name.toLowerCase() === categoryFilter
      : true;

    return matchesSearchQuery && matchesCategoryFilter;
  });
  const ShowProduct = () => {
    return (
      <>
        <div className="container-fluid">
          <div className="text-center py-3 mb-3">
            <h2 className="mb-4">All Products</h2>
            <span className="mb-4 fs-5 fw-semibold">
              Search by Product Name &nbsp;
            </span>
            <input
              type="text"
              className="px-2"
              onChange={handleSearch}
              value={searchQuery}
              style={{ outline: "none" }}
            />
          </div>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("")}
            >
              All Products
            </Button>
            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("nuevo")}
            >
              Nuevo
            </Button>

            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("electronics")}
            >
              Electronics
            </Button>
            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("furniture")}
            >
              Furniture
            </Button>
            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("shoes")}
            >
              Shoes
            </Button>
            <Button
              variant="secondary"
              className=""
              onClick={() => filterProducts("Miscellaneous")}
            >
              Miscellaneous
            </Button>
          </div>

          <div className="row g-4 row-cols-1 p-5 row-cols-md-4 ">
            {filteredData.length === 0 ? (
              <div className="col"> No Products found.</div>
            ) : (
              filteredData.map((product) => (
                <div className="col" key={product.id}>
                  <div className="card">
                    <MDBCarousel showControls fade>
                      {product.images.map((image, index) => (
                        <MDBCarouselItem key={index} itemId={index + 1}>
                          <img
                            src={image}
                            className="d-block w-100 img-fluid"
                            alt={`Product ${index + 1}`}
                          />
                        </MDBCarouselItem>
                      ))}
                    </MDBCarousel>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text truncate">
                        {product.description}
                      </p>
                      <p className="card-text truncate">
                        Category Name: {product.category.name}
                      </p>

                      <p className="card-text truncate">
                        <b> Price: &#8377; {product.price}</b>
                      </p>

                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-dark"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">{loading ? <Loading /> : <ShowProduct />}</div>
    </>
  );
};

export default Product;
