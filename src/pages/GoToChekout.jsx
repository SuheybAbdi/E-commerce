import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const GoToCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  console.log("totalAmount=====", totalAmount);

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
    console.log("totalAmount__________", totalAmount);

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
      },
      prefill: {
        name: "Dev Limbasiya",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className="container me-5 ps-5 d-flex justify-content-start mt-5">
        <Link to={"/shoppingCart/:id"}>
          <button className="btn btn-dark">
            <MdKeyboardBackspace fontSize={35} />
          </button>
        </Link>
      </div>

      <div className="py-5 d-flex justify-content-center mb-3">
        <div className="col-md-6">
          <div className="card bg-primary text-white rounded-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 ">Card details</h4>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  className="img-fluid rounded-3"
                  style={{ width: "45px" }}
                  alt="Avatar"
                />
              </div>

              <p className="small mb-2">Card type</p>
              <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-mastercard fa-2x me-2"></i>
              </a>
              <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-visa fa-2x me-2"></i>
              </a>
              <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-amex fa-2x me-2"></i>
              </a>
              <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-paypal fa-2x"></i>
              </a>

              <form className="mt-4">
                <div
                  data-mdb-input-init
                  className="form-outline form-white mb-4"
                >
                  <input
                    type="text"
                    id="typeName"
                    className="form-control form-control-lg"
                    siez="17"
                    placeholder="Cardholder's Name"
                  />
                  <label className="form-label ps-1" htmlFor="typeName">
                    Cardholder's Name
                  </label>
                </div>

                <div
                  data-mdb-input-init
                  className="form-outline form-white mb-4"
                >
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    siez="17"
                    placeholder="1234 5678 9012 3457"
                    minLength="19"
                    maxLength="19"
                  />
                  <label className="form-label ps-1" htmlFor="typeText">
                    Card Number
                  </label>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div
                      data-mdb-input-init
                      className="form-outline form-white"
                    >
                      <input
                        type="text"
                        id="typeExp"
                        className="form-control form-control-lg"
                        placeholder="MM/YYYY"
                        size="7"
                        //   id="exp"
                        minLength="7"
                        maxLength="7"
                      />
                      <label className="form-label ps-1" htmlFor="typeExp">
                        Expiration
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      data-mdb-input-init
                      className="form-outline form-white"
                    >
                      <input
                        type="password"
                        id="typeText"
                        className="form-control form-control-lg"
                        placeholder="&#9679;&#9679;&#9679;"
                        size="1"
                        minLength="3"
                        maxLength="3"
                      />
                      <label className="form-label ps-1" htmlFor="typeText">
                        Cvv
                      </label>
                    </div>
                  </div>
                </div>
              </form>

              <hr className="my-4" />

              <div className="d-flex justify-content-between">
                <p className="mb-2 fs-5 fw-semibold">SubTotal</p>
                <p className="mb-2 fs-5 fw-semibold">${totalAmount}.00</p>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <p className="mb-2 fs-5 fw-semibold">Total(Incl. taxes)</p>
                <p className="mb-2 fs-5 fw-semibold">${totalAmount}.00</p>
              </div>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-info btn-block btn-lg"
              >
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">${totalAmount}</span> &nbsp; &nbsp;
                  <span
                    className="fw-bold"
                    onClick={() => displayRazorPay(totalAmount)}
                  >
                    Checkout
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoToCheckout;
