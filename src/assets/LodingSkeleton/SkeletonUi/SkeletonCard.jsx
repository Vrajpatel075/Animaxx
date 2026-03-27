// SkeletonCard.jsx
import React from 'react';
import '../SkeletonStyle/SkeletonCard.css'
import { useSelector } from 'react-redux';

export default function SkeletonCard() {
  const currMode = useSelector((state)=>state.theme.mode);
  return (
    <div className="skeleton-card">
      <div className={`skeleton-img ${currMode === "light" ? "light" : "dark"}`}></div>
      <div className={`skeleton-text ${currMode === "light" ? "light" : "dark"}`}></div>
    </div>
  );
}
