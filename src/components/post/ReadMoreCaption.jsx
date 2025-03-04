import React, { useState } from "react";
import "./PostPreview.scss";

function ReadMoreCaption({ paragraph }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewParagraph = paragraph.slice(0, 100);

  return (
    <div className="read-more-caption">
      {paragraph.length > 100 ? (
        <div>
          {isExpanded
            ? paragraph.substring(0, paragraph.indexOf("#"))
            : previewParagraph + "... "}
          <br />
          {isExpanded &&
          paragraph.substring(0, paragraph.indexOf("#")).length > 0 ? (
            <span style={{ color: "#6ec4fa" }}>
              {paragraph.substring(paragraph.indexOf("#"))}
            </span>
          ) : null}
          {!isExpanded ? (
            <button className="more-btn" onClick={() => setIsExpanded(true)}>
              more
            </button>
          ) : (
            <button className="more-btn" onClick={() => setIsExpanded(false)}>
              less
            </button>
          )}
        </div>
      ) : (
        <p>
          {paragraph.includes("#") ? (
            <div>
              <p>{paragraph.substring(0, paragraph.indexOf("#"))}</p>
              <p style={{ color: "#388ff2" }}>
                {paragraph.substring(paragraph.indexOf("#"))}
              </p>
            </div>
          ) : (
            <div>{paragraph}</div>
          )}
        </p>
      )}
    </div>
  );
}

export default ReadMoreCaption;
