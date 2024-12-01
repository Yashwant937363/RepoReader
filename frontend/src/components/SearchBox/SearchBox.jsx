import React, { useState, useEffect } from "react";
import "./SearchBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "../../store/slices/repoSlice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "enter github url here";
  const [typingIndex, setTypingIndex] = useState(0);
  const url = useSelector((state) => state.repo.url);
  const [errorMessage, setErrorMessage] = useState("");
  const [animate, setAnimation] = useState(false);
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setPlaceholder((prev) => prev + placeholderText.charAt(typingIndex));
      setTypingIndex((prev) => prev + 1);
    }, 100);

    if (typingIndex === placeholderText.length) {
      clearInterval(typingInterval); // Stop typing when the string is complete
    }

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, [typingIndex, placeholderText]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!validateGitHubURL(url)) {
      setAnimation(true);
      console.log("animation running");
    }
  };
  const validateGitHubURL = (value) => {
    // Regex to validate GitHub URLs (https://github.com/username or https://github.com/username/repo)
    const gitHubRegex =
      /^https:\/\/github\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9._-]+)?$/;

    if (!gitHubRegex.test(value)) {
      setErrorMessage("Invalid GitHub URL. Please enter a valid URL.");
      return true;
    } else {
      setErrorMessage(""); // Clear the error message if valid
      return false;
    }
  };
  const handleOnChange = (e) => {
    dispatch(setUrl(e.target.value));
    validateGitHubURL(e.target.value);
  };
  return (
    <div className="search-box">
      <form
        className={`input-container ${animate ? "go-up-animation" : ""}`}
        onSubmit={handleOnSubmit}
      >
        <div className="wrapper">
          <input
            className={`url-input ${animate ? "go-up-elements" : ""}`}
            value={url}
            onChange={handleOnChange}
            placeholder={placeholder}
          ></input>
          <button
            className={`send-btn btn  ${animate ? "go-up-elements" : ""}`}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <span className="error-message">{errorMessage}</span>
        </div>
      </form>
    </div>
  );
}
