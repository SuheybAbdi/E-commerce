import React from "react";
import { FaThumbsUp, FaShippingFast, FaStar } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="text-center p-8">
          <h1 className="text-6xl mb-4 font-thin tracking-widest" style={{ fontFamily: "Ysabeau Office" }}>
            Welcome to Our E-Commerce Store
          </h1>
          <p className="text-2xl mb-4" style={{ fontFamily: "Raleway" }}>
            Discover the best products at unbeatable prices.
          </p>
          <p className="text-2xl" style={{ fontFamily: "Raleway" }}>
            Enjoy seamless shopping experiences and excellent customer service.
          </p>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-16 bg-gray-200 text-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl mb-8 font-bold" style={{ fontFamily: "Ysabeau Office" }}>Our Products</h2>
          <p className="text-xl mb-12" style={{ fontFamily: "Raleway" }}>
            We offer a wide range of products to suit your needs. From electronics to fashion, we have it all.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <img src="public/Clothes.webp" alt="Product 1" className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl mt-4 font-semibold">Product 1</h3>
              <p className="mt-2">High-quality and affordable product.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <img src="public/Electronic.jpg" alt="Product 2" className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl mt-4 font-semibold">Product 2</h3>
              <p className="mt-2">Reliable and durable product.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <img src="public/Shoes.jpg" alt="Product 3" className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl mt-4 font-semibold">Product 3</h3>
              <p className="mt-2">Best-selling product with excellent reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-200 text-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl mb-8 font-bold" style={{ fontFamily: "Ysabeau Office" }}>Customer Testimonials</h2>
          <p className="text-xl mb-12" style={{ fontFamily: "Raleway" }}>
            Hear what our happy customers have to say about us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <FaThumbsUp className="text-4xl text-blue-500 mx-auto mb-4" />
              <p>"Amazing quality and fast delivery. I'm very satisfied with my purchase!"</p>
              <p className="mt-4 font-semibold">- Customer 1</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <FaShippingFast className="text-4xl text-green-500 mx-auto mb-4" />
              <p>"Great customer service and a wide range of products. Highly recommend!"</p>
              <p className="mt-4 font-semibold">- Customer 2</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
              <p>"Best shopping experience ever. Will definitely come back for more!"</p>
              <p className="mt-4 font-semibold">- Customer 3</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
