import React from "react";

export default function ShowError(props) {
  const { errormessage } = props;

  return (
    <div className="errorsection">
      <style>
        {`
          .repo-description{
            display:flex;
            justify-content: center;
            align-items:center;
          }
        `}
      </style>
      <img src="/sad.png" className="sademoji"></img>
      <span className="errormessage">{errormessage}</span>
    </div>
  );
}
