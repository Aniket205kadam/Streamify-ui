import { useState } from "react";
import FileUpload from "../post/FileUpload";
import UploadPostDetails from "../post/UploadPostDetails";
import "./AddPost.scss";
import Rocket from "../3D-componets/Rocket";
import postService from "../../services/postService";
import ShowInfoBanner from "../popups/ShowInfoBanner";
import useAuthToken from "../../hooks/useAuthToken";
import { useSelector } from "react-redux";

function AddPost({ ref }) {
  const [files, setFiles] = useState("");
  const [currPostId, setCurrPostId] = useState("");
  const [uploadState, setUploadState] = useState({
    isUploadingContent: false,
    isUploadingDetails: false,
    isPostAdded: false,
    isCompleted: false,
  });
  const [error, setError] = useState("");
  const authToken = useAuthToken();

  const uploadContent = async (selectedFiles) => {
    setFiles(selectedFiles);
    const { success, error, data } = await postService.uploadPostContent(
      selectedFiles,
      authToken,
      20000
    );
    if (!success) setError(error);
    setCurrPostId(data);
    setUploadState({ ...uploadState, isUploadingContent: true });
  };

  const uploadPostDetails = async (data) => {
    setUploadState({
      ...uploadState,
      isPostAdded: true,
      isUploadingDetails: true,
    });

    const { success, error, response } = await postService.uploadPostMetaData(
      {
        id: currPostId,
        caption: data.caption,
        visibility: "PUBLIC",
        isArchived: false,
        location: data.location,
        // collaborators: data.collaborators,
        hideLikesAndViewCounts: data.isHideLike,
        allowComments: data.isHideComment,
      },
      authToken,
      20000
    );

    if (!success) {
      setError(error);
      return;
    }

    if (currPostId != response) {
      setError(new Error("Hmm... That didn’t go as planned! 🤔"));
      return;
    }

    setTimeout(() => {
      setUploadState({
        isUploadingContent: false,
        isUploadingDetails: false,
        isPostAdded: true,
        isCompleted: true,
      });
      setCurrPostId(response);
    }, 5000);
  };

  return (
    <div className="page-overlay">
      {uploadState.isUploadingContent && (
        <ShowInfoBanner
          msg={
            "🎉 Success! Your post content has been uploaded seamlessly! 🚀✨"
          }
          success
        />
      )}
      {uploadState.isCompleted && (
        <ShowInfoBanner
          msg={
            "🎉 Success! Your post has been uploaded seamlessly! 🚀✨\n" +
            "POST ID: " +
            currPostId
          }
          success
        />
      )}
      {error && <ShowInfoBanner msg={"❌ ERROR: " + error} />}
      <div className="upload-container" ref={ref}>
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
