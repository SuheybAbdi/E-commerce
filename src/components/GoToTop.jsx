import React, { useState, useEffect } from "react";
import { FiArrowUpCircle } from "react-icons/fi";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const ListenToScroll = () => {
    let heightToHidden = 250;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", ListenToScroll);
    return () => window.removeEventListener("scroll", ListenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-12 right-12 cursor-pointer transition-all duration-300 ease-in"
          onClick={goToBtn}
        >
          <FiArrowUpCircle
            className="text-black hover:text-orangered"
            size={40}
          />
        </div>
      )}
    </>
  );
};

export default GoToTop;
