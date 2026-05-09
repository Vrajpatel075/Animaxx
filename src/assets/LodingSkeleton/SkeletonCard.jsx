import React, { useEffect, useState } from 'react';
import './SkeletonCard.css';
import { useSelector } from 'react-redux';

export default function SkeletonCard() {
  const [isMobileDisplay, setIsMobileDisplay] = useState(false);
  const currMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileDisplay(window.innerWidth <= 500);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobileDisplay ? (
    <div className={`skeleton-post ${currMode === "light" ? "light" : "dark"}`}>

      {/* Header */}
      <div className="skeleton-header">
        <div className="skeleton-avatar shimmer"></div>
        <div className="skeleton-username shimmer"></div>
      </div>

      {/* Image */}
      <div className="skeleton-image shimmer"></div>

      {/* Actions */}
      <div className="skeleton-actions">
        <div className="skeleton-icon shimmer"></div>
        <div className="skeleton-icon shimmer"></div>
        <div className="skeleton-icon shimmer"></div>
      </div>

      {/* Caption */}
      <div className="skeleton-caption">
        <div className="skeleton-line short shimmer"></div>
        <div className="skeleton-line long shimmer"></div>
      </div>

    </div>
  ) : (
    <div className={`skeleton-card ${currMode === "light" ? "light" : "dark"}`}>
      <div className={`skeleton-img shimmer`}></div>
      <div className={`skeleton-text shimmer`}></div>
    </div>
  );
}