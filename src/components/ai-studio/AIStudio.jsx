import AILeftBar from "./AILeftBar";
import Discover from "./Discover";
import "./AIStudio.scss";

function AIStudio() {
  const isDiscoverDisplay = true;


  return (
    <div className="studio-container">
      <div className="ai-left-bar">
        <AILeftBar />
      </div>
      <div className="right-container">
        {isDiscoverDisplay && <Discover />}
        {/* {isYourAIsDisplay && <YourAIs />}
        {isAIChatDisplay && <AIConversion chatId={chatId} />} */}
      </div>
    </div>
  );
}

export default AIStudio;
