import React from "react";
import { GiArrowCluster, GiCatapult, GiAncientSword } from "react-icons/gi"; // Import icons from react-icons
import "./Card.css";

const Card = ({ title, power, image, type }) => {
  const renderIcon = () => {
    switch (type) {
      case "melee":
        return <GiAncientSword size={18} color="#000" />;
      case "ranged":
        return <GiArrowCluster size={18} color="#000" />;
      case "siege":
        return <GiCatapult size={18} color="#000" />;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="card-top-left">
          <div className="power">{power}</div>
          <div className="icon">{renderIcon()}</div>
        </div>
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
};

export default Card;
