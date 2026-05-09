import React from 'react'
import "./SkeletonCard.css"

function CommentSkeleton() {
  return (
      <div className="skeleton-header">
        <div className="skeleton-avatar shimmer"></div>
        <div className="skeleton-username shimmer"></div>
      </div>
  )
}

export default CommentSkeleton