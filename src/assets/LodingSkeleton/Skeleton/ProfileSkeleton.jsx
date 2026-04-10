import React from "react";
import "./ProfileSkeleton.css"
import { useSelector } from "react-redux";

export default function ProfileSkeleton() {
    const currMode = useSelector((state)=>state.theme.mode);
  return (
    <div className="profile-skeleton">

      {/* Header Section */}
      <div className="profile-header">
        <div className={`skeleton ${currMode === "light" ? "light" : "dark"} avatar`}></div>

        <div className="profile-info">
          <div className={`skeleton ${currMode === "light" ? "light" : "dark"} name`}></div>
          <div className={`skeleton ${currMode === "light" ? "light" : "dark"} username`}></div>

          <div className="stats">
            <div className={`skeleton ${currMode === "light" ? "light" : "dark"} stat`}></div>
            <div className={`skeleton ${currMode === "light" ? "light" : "dark"} stat`}></div>
            <div className={`skeleton ${currMode === "light" ? "light" : "dark"} stat`}></div>
          </div>

        </div>
      </div>

          <div className={`skeleton ${currMode === "light" ? "light" : "dark"} bio`}></div>
          <div className={`skeleton ${currMode === "light" ? "light" : "dark"} bio small-bio`}></div>
      
      {/* Tabs */}
      <div className="profile-tabs">
        <div className={`skeleton ${currMode === "light" ? "light" : "dark"} tab`}></div>
        <div className={`skeleton ${currMode === "light" ? "light" : "dark"} tab`}></div>
      </div>

      {/* Posts Grid */}
      <div className="profile-posts">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`skeleton ${currMode === "light" ? "light" : "dark"} post`}></div>
        ))}
      </div>

    </div>
  );
}