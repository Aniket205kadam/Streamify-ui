import { useState } from "react";
import FileUpload from "../post/FileUpload";
import UploadPostDetails from "../post/UploadPostDetails";
import "./AddPost.scss";
import Rocket from "../3D-componets/Rocket";

function AddPost({ ref }) {
  const [files, setFiles] = useState(null);
  const [uploadState, setUploadState] = useState({
    isUploadingContent: false,
    isUploadingDetails: false,
    isPostAdded: false,
    isCompleted: false,
  });

  const uploadContent = async (selectedFiles) => {
    setFiles(selectedFiles);
    setUploadState({ ...uploadState, isUploadingContent: true });

    // Simulate uploading delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(
      "Uploaded server data:",
      selectedFiles.map((file) => file.name)
    );
  };

  const uploadPostDetails = async () => {
    setUploadState({
      ...uploadState,
      isPostAdded: true,
      isUploadingDetails: true,
    });

    console.log("Uploading data...");
    setTimeout(() => {
      setUploadState({
        isUploadingContent: false,
        isUploadingDetails: false,
        isPostAdded: true,
        isCompleted: true,
      });
    }, 5000);
  };

  return (
    <div className="page-overlay">
      <div className="upload-container"  ref={ref}>
        {!uploadState.isUploadingContent && !uploadState.isCompleted && (
          <FileUpload contentHandler={uploadContent} />
        )}

        {uploadState.isUploadingContent && !uploadState.isPostAdded && (
          <UploadPostDetails
            files={files}
            handlePostUpload={uploadPostDetails}
          />
        )}

        {uploadState.isUploadingDetails && uploadState.isPostAdded && (
          <div className="pending-animation">
            <Rocket />
          </div>
        )}

        {uploadState.isCompleted && (
          <div className="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPost;
