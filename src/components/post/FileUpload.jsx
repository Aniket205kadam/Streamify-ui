import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faArrowLeft,
  faImages,
  faXmark,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import "./FileUpload.scss";

function FileUpload({ contentHandler }) {
  const [files, setFiles] = useState([]);
  const [contentIdx, setContentIdx] = useState(0);
  const [showAllContent, setShowAllContent] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
    },

    onDrop: (files) => {
      console.log(files);
      setFiles((prevFiles) => [...prevFiles, ...files]);
    },
  });

  return (
    <div className="file-upload-container">
      {files.length == 0 && (
        <div className="add-files">
          <div className="heading">
            <h3>Create new post</h3>
          </div>
          <div
            className="body"
            {...getRootProps()}
            role="button"
            aria-label="Drag and drop files here or click to select"
          >
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faImage} className="icon" />
            <h5>Drag photos and videos here</h5>
            <button
              type="button"
              className="select-button"
              onClick={() => document.getElementById("file-input").click()}
            >
              Select from Computer
            </button>
          </div>
          {/* <div></div> */}
        </div>
      )}
      {files.length > 0 && (
        <div className="uploaded-content">
          <div className="heading">
            <button>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span>Create new post</span>
            <span
              onClick={() => {
                console.log("Ready to got server");
                contentHandler(files);
              }}
            >
              Next
            </span>
          </div>
          <div className="content">
            {files[contentIdx].type.startsWith("video/") ? (
              <video
                src={URL.createObjectURL(files[contentIdx])}
                loop
                autoPlay
              />
            ) : (
              <img src={URL.createObjectURL(files[contentIdx])} />
            )}
            {showAllContent && (
              <div className="all-content">
                {files.map((file, idx) => (
                  <div
                    className={`content ${contentIdx === idx ? "" : "blured"}`}
                    onClick={() => {
                      setShowAllContent(false);
                      setContentIdx(idx);
                    }}
                    key={file.name + idx}
                  >
                    {contentIdx === idx && (
                      <div className="remove" key={file.name + idx}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => {
                            const removedFile = files[idx];
                            console.log(removedFile);
                            setFiles((prevFiles) =>
                              prevFiles.filter(
                                (file) =>
                                  !(
                                    file.name === removedFile.name &&
                                    file.size === removedFile.size
                                  )
                              )
                            );
                          }}
                        />
                      </div>
                    )}
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        key={file.name + idx}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        key={file.name + idx}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div
              className="view-all-content"
              onClick={() => setShowAllContent((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faImages} />
            </div>
            <div className="add-more" {...getRootProps()}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
