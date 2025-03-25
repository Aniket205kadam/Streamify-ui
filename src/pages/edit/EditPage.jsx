import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import "./EditPage.scss";

function EditPage() {
  const [isOpen, setIsOpen] = useState(false);
  const connectedUser = {
    username: "aniket205kadam",
    fullName: "Aniket Kadam",
    profileUrl:
      "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=600",
  };
  const website = "https://www.aniket205kadam.com";
  const bio = "I never lose; I either win or learn;";
  const gender = "male";

  return (
    <div className="editProfile">
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
        <button className="changePhoto">Change photo</button>
      </div>

      <div className="formSection">
        <div className="formGroup">
          <label>Website</label>
          <input type="text" value={website} className="websiteMessage" />
          <div className="info">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </div>
        </div>

        <div className="formGroup">
          <label>Bio</label>
          <textarea className="bioInput" value={bio} maxLength={150} />
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
                    checked={gender === "male"}
                    onChange={() => handleGenderChange("male")}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="genderOption">
                  <span className="labelText">Female</span>
                  <input
                    type="checkbox"
                    checked={gender === "female"}
                    onChange={() => handleGenderChange("female")}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="genderOption">
                  <span className="labelText">Prefer not to say</span>
                  <input
                    type="checkbox"
                    checked={gender === "preferNot"}
                    onChange={() => handleGenderChange("preferNot")}
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

        <button className="submitButton">Submit</button>
      </div>

      <Footer />
    </div>
  );
}

export default EditPage;
