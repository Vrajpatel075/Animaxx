import React, { useState } from "react";
import { FaArrowLeft, FaPen, FaLock, FaLockOpen } from "react-icons/fa";
import UserService from "../../../../Service/UserService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useProfileForm } from "../useProfileForm";

function EditProfile({handleBack }) {
  
  const { editFormData, handleChange, handleSave, usernameerror, profile } = useProfileForm();
  const [isEditable, setIsEditable] = useState(false);
  const currMode = useSelector((state) => state.theme.mode);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await UserService.uploadProfilePicture(editFormData.userId, file);
      setEditformData(res.data);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile picture");
    }
  };

  return (
    <div className="setting_header">
      <div className="userInfoContainer">
        <div className="BackHeader">
          <button
            className={`backButton ${currMode === "light" ? "light" : "dark"}`}
            onClick={handleBack}
          >
            <FaArrowLeft />
          </button>
          <h1>Edit Profile</h1>
        </div>

        {/* Profile Picture */}
        <div className="Profil_Pic">
          <img
            src={
              profile?.profilePicture
                ? `http://localhost:8080/uploads/profile-pics/${profile?.profilePicture}`
                : "/animax img source/ANIMAX_LOGO.png"
            }
            alt="Profile Pic"
          />
          <input
            type="file"
            accept="image/*"
            id="profilePictureUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <button onClick={() => document.getElementById("profilePictureUpload").click()}>
            <FaPen /> <span>Change Photo</span>
          </button>
        </div>

        {/* Update Profile Form */}
        <div className="Update_Profile">
          <button onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? <FaLockOpen /> : <FaLock />} <span>Edit</span>
          </button>
          <form onSubmit={handleSave} className={currMode === "light" ? "light" : "dark"}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleChange}
                disabled={!isEditable}
              />
              {usernameerror && <span className="error">{usernameerror}</span>}
            </div>

            <div>
              <label>Bio</label>
              <textarea
                className="bio"
                name="bio"
                maxLength={150}
                rows={3}
                placeholder="Write about yourself"
                value={editFormData.bio || ""}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="inputColums">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={editFormData.website || ""}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="gender_save">
              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={editFormData.gender || ""}
                  disabled={!isEditable}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit">Save</button>
            </div>
          </form>

          <p className="Account_Created">
            <span>Account Created On </span>
            {profile?.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
