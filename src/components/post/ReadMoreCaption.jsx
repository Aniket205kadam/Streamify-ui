import React, { useState } from "react";
import "./PostPreview.scss";

function ReadMoreCaption({ paragraph }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewParagraph = paragraph.slice(0, 100);

  return (
    <div className="read-more-caption">
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
      {!isExpanded && (
        <button className="more-btn" onClick={() => setIsExpanded(true)}>
          more
        </button>
      )}
    </div>
  );
}

export default ReadMoreCaption;
