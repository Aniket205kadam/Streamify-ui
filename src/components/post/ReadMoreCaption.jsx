import React, { useState } from "react";
import "./PostPreview.scss";

function ReadMoreCaption({ paragraph = "" }) {
  if (!paragraph || typeof paragraph !== "string") return null;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const hashIndex = paragraph.indexOf("#");
  
  // Safe string operations
  const previewText = paragraph.slice(0, maxLength);
  const hasHashTag = hashIndex > -1;
  const mainText = hasHashTag ? paragraph.slice(0, hashIndex) : paragraph;
  const hashTags = hasHashTag ? paragraph.slice(hashIndex) : "";

  return (
    <div className="read-more-caption">
      {paragraph.length > maxLength ? (
        <div>
          {isExpanded ? mainText : `${previewText}... `}
          {hasHashTag && (
            <span style={{ color: "#6ec4fa" }}>
              {isExpanded ? hashTags : ""}
            </span>
          )}
          <button 
            className="more-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "less" : "more"}
          </button>
        </div>
      ) : (
        <div>
          {hasHashTag ? (
            <>
              <div>{mainText}</div>
              <div style={{ color: "#388ff2" }}>{hashTags}</div>
            </>
          ) : (
            <div>{paragraph}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReadMoreCaption;