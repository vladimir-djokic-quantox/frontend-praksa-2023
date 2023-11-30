import React from "react";

const StarRating = ({ rating, size }) => {
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starStyle = {
    fontSize: size || "34px", 
    color: "#FFD700", 
    marginRight: "2px", 
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<span key={i} style={starStyle}>&#9733;</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={starStyle}>&#9734;</span>);
    }

    const remainingStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={i + fullStars} style={{ ...starStyle, color: "#B0B0B0" }}>&#9734;</span>);
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
