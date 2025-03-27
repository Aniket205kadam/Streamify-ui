import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./AddStory.scss";
import storyService from "../../services/storyService";
import useAuthToken from "../../hooks/useAuthToken";
import ShowInfoBanner from "../popups/ShowInfoBanner";
import ButtonLoading from "../icons/ButtonLoading";
import SuccessAnimation from "../icons/SuccessAnimation";

function AddStory({ ref }) {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(false);
  const [storyState, setStoryState] = useState({
    isCompleted: false,
    isUploading: false,
    storyId: null,
  });
  const authToken = useAuthToken();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
    },

    onDrop: (files) => {
      setFile(files[0]);
    },
  });

  const handleStory = async () => {
    if (!file) return;
    setStoryState({ isCompleted: false, isUploading: true, storyId: null });
    const { success, data, error } = await storyService.addStory(
      {
        caption: caption,
        content: file,
      },
      authToken
    );
    if (!success) {
      setStoryState({ isCompleted: false, isUploading: false, storyId: null });
      setError(error);
      return;
    }
    setStoryState({ isCompleted: true, isUploading: false, storyId: data });
  };

  return (
    <div className="page-overlay">
      {storyState.isCompleted && (
        <ShowInfoBanner
          msg={
            "🎉 Your story has been successfully uploaded! Story ID: " +
            storyState.storyId
          }
          success
        />
      )}
      {error && (
        <ShowInfoBanner
          msg={"⚠️ Something went wrong! Error details: " + error}
        />
      )}
      {storyState.isCompleted ? <SuccessAnimation /> : (
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
              {/* <div className="caption">
                <label htmlFor="caption">Caption: </label>
                <input
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div> */}
              <div className="add-btn" onClick={handleStory}>
                {storyState.isUploading ? (
                  <ButtonLoading />
                ) : (
                  <span>
                    Add Story <FontAwesomeIcon icon={faPlusCircle} />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default AddStory;
