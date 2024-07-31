import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { FaCartShopping } from "react-icons/fa6";
import { RiLuggageCartFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = ({ AddToCart, ToastContainer }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log("Error fetching API data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getApi();
    }
  }, [id]);

  const style = {
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "1px",
    color: "#72b5d0",
  };

  const font = {
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "1px",
    fontSize: "17px",
  };

  const Loading = () => (
    <div className="mt-4 d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
      <Spinner animation="grow" />
      &nbsp; &nbsp;
    </div>
  );

  const ShowProduct = () => (
    <div className="container">
      <div className="row p-5">
        <div className="col-md-6">
          {/* <img src={data.images[0]} alt={data.title} /> */}
          <MDBCarousel showControls fade>
            {data.images.map((image, index) => (
              <MDBCarouselItem key={index} itemId={index + 1}>
                <img
                  src={image}
                  className="d-block w-100 img-fluid rounded-4"
                  alt={`Product ${index + 1}`}
                />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
        </div>
        <div className="col-md-6 d-flex flex-column mt-1">
          <h5 className="card-title pb-3 fs-1 fw-semibold " style={style}>
            {data.title}
          </h5>
          <p className="card-text pb-2 fw-light" style={font}>
            {data.description}
          </p>
          <p className="card-text pb-2 fw-semibold fs-4">
            Category Name: {data.category.name}
          </p>
          <p className="card-text fs-4 ">
            <b>Price: &#8377; {data.price}</b>
          </p>
          <div className="mt-3">
            <button
              className="btn btn-dark fw-semibold"
              onClick={() => AddToCart(data)}
            >
              Add to Cart &nbsp; <FaCartShopping />
            </button>{" "}
            &nbsp; &nbsp;
            <Link to={`/shoppingCart/${data.id}`}>
              <button className="btn btn-dark fw-semibold">
                Go to Cart &nbsp; <RiLuggageCartFill />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-start mt-2 ">
        <Link to={"/products"}>
          <button className="btn btn-dark">
            <MdKeyboardBackspace fontSize={35} />
          </button>
        </Link>
      </div>
      {loading ? <Loading /> : data && <ShowProduct />}
      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
