import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-5xl text-blue-500 mr-4" />
            <h1 className="text-5xl font-bold" style={{ fontFamily: "Ysabeau Office" }}>
              Welcome to Our E-Commerce Store
            </h1>
          </div>
          <p className="text-xl mb-4" style={{ fontFamily: "Raleway" }}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <p className="text-xl">
            <a href="#" className="text-blue-500 font-semibold">Have a question?</a> Ask me on <a href="#" className="text-blue-500 font-semibold">Twitter</a>
          </p>
        </div>
        <div className="md:w-1/2 p-8">
          <img src="/About.png" alt="E-Commerce Store" className="rounded-lg shadow-lg"/>
        </div>
      </div>
    </section>
  );
};

export default About;
