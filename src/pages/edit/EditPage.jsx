import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import "./EditPage.scss";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import Avtar from "../../components/popups/Avtar";

function EditPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const connectedUser = useConnectedUser();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isUpdatable, setIsUpdatable] = useState(false);

  const fetchUserDetails = async () => {
    const userResponse = await userService.getUserByUsername(
      connectedUser.username,
      connectedUser.authToken
    );
    if (!userResponse.success) {
      toast.error("Failed to fetch user details: " + userResponse.error);
      return;
    }
    const userDetails = userResponse.data;
    setWebsite(userDetails.website || "");
    setBio(userDetails.bio || "");
    setGender(userDetails.gender || "");
  };

  const updateProfileHandler = async () => {
    const profileResponse = await userService.updateUserProfile(
      { website, bio, gender },
      connectedUser.authToken
    );
    if (!profileResponse.success) {
      toast.error("Failed to update details, try again!");
      return;
    }
    toast.success("Successfully update the details!");
    setIsUpdatable(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="editProfile">
      {showProfileOptions && (
        <Avtar close={() => setShowProfileOptions(false)} />
      )}
      <div className="profileHeader">
        <h1>Edit profile</h1>
      </div>

      <div className="profileSection">
        <div className="avatarWrapper">
          <img
            src={connectedUser.profileUrl}
            alt={connectedUser.username + " profile"}
          />
        </div>
        <div className="userInfo">
          <h2>{connectedUser.username}</h2>
          <p>{connectedUser.fullName}</p>
        </div>
        <button
          className="changePhoto"
          onClick={() => setShowProfileOptions(true)}
        >
          Change photo
        </button>
      </div>

      <div className="formSection">
        <div className="formGroup">
          <label>Website</label>
          <input
            type="text"
            value={website}
            className="websiteMessage"
            placeholder="website"
            onChange={(e) => {
              setWebsite(e.target.value.trim());
              setIsUpdatable(true);
            }}
          />
          <div className="info">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </div>
        </div>

        <div className="formGroup">
          <label>Bio</label>
          <textarea
            className="bioInput"
            value={bio}
            maxLength={150}
            placeholder="bio"
            onChange={(e) => {
              setBio(e.target.value);
              setIsUpdatable(true);
            }}
          />
          <div className="bioCounter">{bio.length}/150</div>
        </div>

        <div className="formGroup">
          <label>Gender</label>
          <div className="genderSelector">
            <div className="selectedOption" onClick={() => setIsOpen(!isOpen)}>
              {gender || "Select Gender"}
              <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
            </div>

            {isOpen && (
              <div className="genderOptions">
                <label className="genderOption">
                  <span className="labelText">Male</span>
                  <input
                    type="checkbox"
                    checked={gender === "Male"}
                    onChange={() => {
                      setGender("Male");
                      setIsUpdatable(true);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="genderOption">
                  <span className="labelText">Female</span>
                  <input
                    type="checkbox"
                    checked={gender === "Female"}
                    onChange={() => {
                      setGender("Female");
                      setIsUpdatable(true);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="genderOption">
                  <span className="labelText">Prefer not to say</span>
                  <input
                    type="checkbox"
                    checked={gender === "Prefer not to say"}
                    onChange={() => {
                      setGender("Prefer not to say");
                      setIsUpdatable(true);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            )}
          </div>
          {/* <div className="genderOptions">
            <div className="genderOption">
              <input type="radio" id="male" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
            <div className="genderOption">
              <input type="radio" id="female" name="gender" />
              <label htmlFor="female">Female</label>
            </div>
            <div className="genderOption">
              <input type="radio" id="preferNot" name="gender" />
              <label htmlFor="preferNot">Prefer not to say</label>
            </div>
          </div> */}
          <p className="genderHint">
            This won't be part of your public profile.
          </p>
        </div>

        <p className="disclaimer">
          Certain profile info, like your name, bio and links, is visible to
          everyone.
        </p>

        <button
          className={`submitButton ${isUpdatable ? "" : "disable"}`}
          onClick={updateProfileHandler}
        >
          Submit
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default EditPage;
