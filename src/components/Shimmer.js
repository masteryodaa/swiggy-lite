import React from 'react'

function Shimmer() {
  return (
    <div className="shimmerList">
      { Array(12).fill().map((_, i) => (
        <div className="shimmer" key={i}></div>
        ))}
    </div>
  )
}

export default Shimmer