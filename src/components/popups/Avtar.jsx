import React, { useRef } from "react";
import "./PostInfo.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { useDropzone } from "react-dropzone";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/authenticationSlice";

function Avtar({ close }) {
  const connectedUser = useConnectedUser();
  const optionRef = useRef(null);
  const dispatch = useDispatch();

  useClickOutside(optionRef, close);

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (files) => {
      uploadProfile(files[0]);
      // after try to upload the post we are close options
      close();
    },
  });

  const uploadProfile = async (file) => {
    const profileResponse = await userService.uploadUserProfile(
      file,
      connectedUser.authToken
    );
    if (!profileResponse.success) {
      toast.error("Failed to upload the profile!");
      return;
    }
    dispatch(login({ ...connectedUser, profileUrl: profileResponse.data }));
    toast.success("Successfully upload the profile");
  };

  const profileRemovingHandler = async () => {
    const profileResponse = await userService.deleteUserProfile(
      connectedUser.authToken
    );
    // close the opended options
    close();
    if (!profileResponse.success) {
        toast.error("Failed to remove the profile!");
        return;
      }
      dispatch(login({ ...connectedUser, profileUrl: profileResponse.data }));
      toast.success("Successfully remove the profile");
  };

  return (
    <div className="options-wrapper">
      <div className="options" ref={optionRef}>
        <h3 className="heading">Change Profile Photo</h3>
        <div className="option" {...getRootProps()}>
          <span className="upload">Upload Photo</span>
          <input {...getInputProps()} />
        </div>
        <div className="option" onClick={profileRemovingHandler}>
          <span className="warn">Remove Current Photo</span>
        </div>
        <div className="option" onClick={close}>
          <span>Cancel</span>
        </div>
      </div>
    </div>
  );
}

export default Avtar;
