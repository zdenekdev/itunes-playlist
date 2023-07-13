import { ChevronUpIcon } from "@heroicons/react/24/solid";
import "./TheFooter.scss";
import { useEffect, useState } from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TheFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight * 0.7;

      const curPosition = window.innerHeight + window.scrollY;

      if (curPosition > scrollThreshold && scrollThreshold > 1000) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    console.log(window.scrollY * 0.9, window.scrollY);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-container">
      <div className="socials">
        <i className="icon-container">
          <FontAwesomeIcon icon={faGithub} className="github-icon" />
        </i>
        <i className="icon-container">
          <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
        </i>
      </div>

      {showTopBtn && (
        <ChevronUpIcon className="chevron-up-icon" onClick={goToTop} />
      )}
    </div>
  );
}

export default TheFooter;
