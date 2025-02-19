import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./AddStory.scss";

function AddStory({ ref }) {
  const [file, setFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
    },

    onDrop: (files) => {
      console.log("file is: " + files);
      setFile(files[0]);
    },
  });

  return (
    <div className="page-overlay">
      <div className="story-upload-container" ref={ref}>
        <div className="add-file">
          <div className="heading">
            <span>Create new Story</span>
          </div>
          {!file && (
            <div className="body" {...getRootProps()}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faImage} className="icon" />
              <h5>Drag photo or video here</h5>
              <button
                type="button"
                className="select-button"
                onClick={() => document.getElementById("file-input").click()}
              >
                Select from Computer
              </button>
            </div>
          )}
          {file && (
            <div className="uploaded-content">
              <div className="content">
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    autoPlay
                    loop
                    onClick={(event) =>
                      event.target.paused
                        ? event.target.play()
                        : event.target.pause()
                    }
                  />
                )}
              </div>
              <div className="add-btn">
                <span>
                  Add Story <FontAwesomeIcon icon={faPlusCircle} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddStory;
