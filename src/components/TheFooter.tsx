import { ChevronUpIcon } from "@heroicons/react/24/solid";
import "./TheFooter.scss";
import { useEffect, useState } from "react";

function TheFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    console.log(window);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-container">
      TheFooter
      {showTopBtn && (
        <ChevronUpIcon className="chevron-up-icon" onClick={goToTop} />
      )}
    </div>
  );
}

export default TheFooter;
