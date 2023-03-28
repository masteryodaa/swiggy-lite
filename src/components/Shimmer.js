import React from 'react'

function Shimmer() {
  return (
    <div className="shimmerList" data-testid="shimmer">
      { Array(10).fill().map((_, i) => (
        <div className="shimmer" key={i}></div>
        ))}
    </div>
  )
}

export default Shimmer