import React, { useState, useEffect } from "react";
import {
  getAuth,
  updateProfile,
  updatePassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function MyProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");  // Adding current password for change
  const [message, setMessage] = useState("");

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    // Update displayName and photoURL after profile update
    if (user) {
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, { displayName, photoURL });
      setMessage("Profile updated!");
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (currentPassword) {
        await updatePassword(user, newPassword);  // Firebase requires current password
        setMessage("Password updated!");
      } else {
        setMessage("Please provide current password to change it.");
      }
    } catch (error) {
      setMessage("Failed to change password. Try re-logging in.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profile-pics/${user.uid}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL: downloadURL });
      setPhotoURL(downloadURL);
      setMessage("Profile picture updated!");
    } catch (err) {
      console.error("Error uploading photo:", err);
      setMessage("Failed to upload photo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-xl shadow-md w-full max-w-xl p-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <img
            src={photoURL || "https://via.placeholder.com/100"}
            alt="User"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-teal-600">
              {displayName || "No Name"}
            </h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-sm mt-1">
              🏆 Rewards: 120 | 🧾 Issues Reported: 8 | 👍 Upvotes Given: 32
            </p>
          </div>
        </div>

        <hr />

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setShowUpdateProfile(!showUpdateProfile)}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-400"
          >
            {showUpdateProfile ? "Close Update Profile" : "Update Profile"}
          </button>

          {showUpdateProfile && (
            <div className="space-y-3 mt-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="New display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={handlePhotoUpload}
              />
              <button
                onClick={handleUpdateProfile}
                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          )}

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            {showChangePassword ? "Close Password Change" : "Change Password"}
          </button>

          {showChangePassword && (
            <div className="space-y-3 mt-2">
              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={handleChangePassword}
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              >
                Update Password
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-400"
          >
            Logout
          </button>
        </div>

        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
