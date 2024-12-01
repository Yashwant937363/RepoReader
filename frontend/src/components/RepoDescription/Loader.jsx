import React, { useEffect, useState } from "react";
import "./RepoDescription.css";
import { RotatingLines } from "react-loader-spinner";

export default function Loader() {
  const [cssVariableValue, setCssVariableValue] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const variableValue = getComputedStyle(root)
      .getPropertyValue("--theme-color")
      .trim();
    setCssVariableValue(variableValue);
    console.log(variableValue);
  }, []);
  return (
    <div className="loader">
      <style>
        {`
          .repo-description{
            display:flex;
            justify-content: center;
            align-items:center;
          }
        `}
      </style>
      <RotatingLines
        strokeColor={cssVariableValue}
        strokeWidth="5"
        width="50"
      ></RotatingLines>
    </div>
  );
}
