export default function SendChat(props) {
  return (
    <div className="chat">
      <div className="sendchat">
        <div className="chattext">{props.message}</div>
      </div>
    </div>
  );
}
