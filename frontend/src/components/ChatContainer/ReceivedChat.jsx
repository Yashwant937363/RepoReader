export default function ReceivedChat(props) {
  const { message, status } = props;

  return (
    <div className="chat">
      <div className={`receivedchat ${message === "" ? "loading" : ""}`}>
        <div className="chattext">
          {message === "" ? "there is no message" : message}
        </div>
      </div>
    </div>
  );
}
