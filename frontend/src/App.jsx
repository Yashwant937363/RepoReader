import { useEffect } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import RepoDescription from "./components/RepoDescription/RepoDescription";
import SearchBox from "./components/SearchBox/SearchBox";
import ConnectedNodesBackground from "./components/Background/ConnectedNodesBackground";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "you will loose the data";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <ConnectedNodesBackground></ConnectedNodesBackground>
      <SearchBox></SearchBox>
      <div className="app-sections">
        <ChatContainer></ChatContainer>
        <RepoDescription></RepoDescription>
      </div>
    </div>
  );
}

export default App;
