import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchuserdata } from "../../Redux/authSlice";
import UserService from "../../../Service/UserService";
import { toast } from "react-hot-toast";

export function useProfileForm() {
  const dispatch = useDispatch();
  const { userId, profile } = useSelector((state) => state.auth);

  const [editFormData, setEditformData] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: ""
  });
  const [usernameerror, setUsernameError] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(fetchuserdata(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (profile) {
      const { createdAt, totalPosts, ...safeData } = profile;
      setEditformData((prev) => ({ ...prev, ...safeData }));
    }
  }, [profile]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEditformData((prev) => ({ ...prev, [name]: value }));
    if (name === "username") {
      try {
        const res = await UserService.cheakusername(value);
        setUsernameError(res.data.exists ? "Username already exists." : "");
      } catch (error) {
        toast.error("Error checking username");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.edit(editFormData.userId, editFormData);
      setEditformData(res.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return {
    editFormData,
    setEditformData,
    usernameerror,
    handleChange,
    handleSave,
    userId,
    profile
  };
}
