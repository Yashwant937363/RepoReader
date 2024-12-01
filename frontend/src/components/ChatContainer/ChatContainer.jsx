import React, { useState } from "react";
import SendChat from "./SendChat";
import ReceivedChat from "./ReceivedChat";
import "./ChatContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { addQuery } from "../../store/slices/querySlice";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const queries = useSelector((state) => state.queries.queries);
  const sendQuery = (e) => {
    e.preventDefault();
    let isAnyPending = false;
    if (queries.length > 0) {
      queries.map((item, index) => {
        if (item?.status === "pending") {
          isAnyPending = true;
        }
      });
    }
    if (isAnyPending) {
      alert("cannot send another query before first query is not ended");
      return;
    }
    if (message.trim() === "") {
      alert("cannot send empty");
      return;
    }
    dispatch(addQuery(message));
    setMessage("");
  };
  return (
    <div className="chatcontainer">
      <ReceivedChat message="do you have any questions?"></ReceivedChat>
      {queries.map((item, index) => (
        <React.Fragment key={index}>
          <SendChat message={item.query} />
          <ReceivedChat message={item.answer} status={item.status} />
        </React.Fragment>
      ))}
      <form className="messagebar" onSubmit={sendQuery}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button className="btn send-btn">
          <img className="send-icon" src="/send.png"></img>
        </button>
      </form>
    </div>
  );
}
