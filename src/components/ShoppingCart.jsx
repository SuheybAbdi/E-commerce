import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCart = ({ cart, handleRemoveItem, count }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CART, setCART] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // console.log("cart___________________________________", cart.quantity);

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setData([response?.data]);
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
  // console.log("data", data);

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (dateTime) => {
    const day = String(dateTime.getDate()).padStart(2, "0");
    const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(dateTime.getFullYear()).slice(-2);
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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

  const notify = () =>
    toast.error("Your cart is empty. Please add items to your cart.");

  const handleCheckout = () => {
    // console.log("handleCheckout workable");
    if (CART.length === 0) {
      notify();
    }
  };

  useEffect(() => {
    console.log("cart___________________________________", cart);
    console.log("CART______CART_______CART_______CART_______", CART);
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorPay = async (totalAmount) => {
    console.log("totalAmount", totalAmount);

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("you are offline...Failed to load Razorpay SDk");
      return;
    }

    const options = {
      key: "rzp_test_tspH6C3NKTxwrh",
      currency: "INR",
      amount: totalAmount * 100,
      name: "Dev Store",
      description: "Thanks for purchasing",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
        navigate("/products");
        setData([0]);
        console.log("Before cart reset:", CART); // Add this line
        setCART([0]);
        console.log("After cart reset:", CART); // Add this line
      },
      prefill: {
        name: "Dev Limbasiya",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const goToCheckout = (totalAmount) => {
    console.log("handleCheckout", totalAmount);
    navigate("/goToCheckout", { state: { totalAmount } });
  };

  const CartData = () => {
    const totalAmount =
      CART.map((item) => item.price * item.quantity).reduce(
        (total, value) => total + value,
        0
      ) + (CART.length > 0 ? 20 : 0);

    return (
      <div>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Cart - {count} items</h5>
                  </div>
                  <div className="card-body">
                    {CART.length > 0 ? (
                      CART.map((item, cartIndex) => (
                        <div className="row" key={item.id}>
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.images}
                                className="w-100 rounded-3 "
                                alt="Product"
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: `rgba(251, 251, 251, 0.2)`,
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{item.title}</strong>
                            </p>
                            <p className="">
                              <strong>
                                Category Name : &nbsp;
                                <span>
                                  {data.length > 0
                                    ? data[0].category.name
                                    : "-"}
                                </span>
                              </strong>
                            </p>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-danger btn-sm me-1 mb-2"
                              data-mdb-tooltip-init
                              title="Remove item"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                style={{ maxHeight: "50px" }}
                                className="btn btn-secondary  px-3 me-2"
                                onClick={() => {
                                  const _CART = CART.map((item, index) => {
                                    return cartIndex === index
                                      ? {
                                          ...item,
                                          quantity:
                                            item.quantity > 0
                                              ? item.quantity - 1
                                              : 0,
                                        }
                                      : item;
                                  });
                                  setCART(_CART);
                                }}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div
                                data-mdb-input-init
                                className="form-outline text-center"
                              >
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item.quantity}
                                  type="number"
                                  className="form-control text-center py-2"
                                  readOnly
                                />
                                {/* <span>{cart.quantity}</span> */}
                                <label className="form-label" htmlFor="form1">
                                  Quantity
                                </label>
                              </div>

                              <button
                                style={{ maxHeight: "50px" }}
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-secondary px-3 ms-2"
                                onClick={() => {
                                  const _CART = CART.map((item, index) => {
                                    return cartIndex === index
                                      ? { ...item, quantity: item.quantity + 1 }
                                      : item;
                                  });
                                  setCART(_CART);
                                }}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>${item.price * item.quantity}</strong>
                            </p>
                          </div>
                          <hr className="my-4" />
                        </div>
                      ))
                    ) : (
                      <p>
                        Your cart is empty Go to{" "}
                        <Link
                          to={"/products"}
                          className="fs-5 fw-semibold link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                        >
                          {" "}
                          All Products{" "}
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products Cost
                        <span>
                          $
                          {CART.map(
                            (item) => item.price * item.quantity
                          ).reduce((total, value) => total + value, 0)}
                          {/* ${counter * (data.length > 0 ? data[0].price : 0)} */}
                        </span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-0">
                        <span>
                          {" "}
                          PlatformFee{" "}
                          <span
                            className="fw-bolder "
                            type="button"
                            style={{
                              color: "#ff406c",
                            }}
                          >
                            {" "}
                            Know More
                          </span>
                        </span>
                        <span>
                          <span>{20}</span>
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Date and Time
                        <span>
                          <span>{formatDateTime(currentDateTime)}</span>
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total Amount</strong>
                        </div>
                        <span>
                          <strong>
                            $
                            {CART.map(
                              (item) => item.price * item.quantity
                            ).reduce(
                              (total, value) => total + value,
                              CART.length > 0 ? 20 : 0
                            )}
                            {/* ${counter * (data.length > 0 ? data[0].price : 0)} */}
                          </strong>
                        </span>
                      </li>
                    </ul>
                    {CART.length > 0 ? (
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-primary btn-lg btn-block"
                        onClick={() => goToCheckout(totalAmount)}
                      >
                        Go to checkout
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-primary btn-lg btn-block"
                        onClick={handleCheckout}
                      >
                        Go to checkout
                      </button>
                    )}

                    <button
                      className="btn btn-outline-danger btn-lg btn-block ms-3"
                      onClick={() => displayRazorPay(totalAmount)}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex container justify-content-start mt-2 ">
        <Link to={`/products/${id}`}>
          <button className="btn btn-dark">
            <MdKeyboardBackspace fontSize={35} />
          </button>
        </Link>
      </div>

      <div className="container">{loading ? <Loading /> : <CartData />}</div>
      <ToastContainer />
    </>
  );
};

export default ShoppingCart;
