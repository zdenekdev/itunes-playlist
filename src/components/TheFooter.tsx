import { ChevronUpIcon } from "@heroicons/react/24/solid";
import "./TheFooter.scss";
import { useEffect, useState } from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
