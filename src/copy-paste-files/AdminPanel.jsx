import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { GiArrowCluster, GiCatapult, GiAncientSword } from "react-icons/gi";

import "./AdminPanel.css";

const AdminPanel = () => {
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newCard, setNewCard] = useState({
    id: null,
    title: "",
    power: "",
    type: "melee",
    imageFile: null,
    imageName: "",
  });

  const renderIcon = (type) => {
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
    <div className="admin-panel">
      <button className="logout-button">Logout</button>
      <div className="add-card">
        <h3>{isEditing ? "Edit Card" : "Add New Card"}</h3>
        <input type="text" placeholder="Title" />
        <input type="number" placeholder="Power" />
        <select>
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
          <option value="siege">Siege</option>
        </select>

        <input type="file" accept="image/*" />
        {newCard.imageName && <p>Selected Image: {newCard.imageName}</p>}

        <button>
          {isEditing ? (
            "Save Changes"
          ) : (
            <>
              <FaPlus /> Add Card
            </>
          )}
        </button>
        {isEditing && <button className="cancel-edit">Cancel Edit</button>}
      </div>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="card-top-left">
                <div className="power">{card.power}</div>
                <div className="icon">{renderIcon(card.type)}</div>
              </div>
              <button className="delete-icon">
                <FaTrash />
              </button>
              <div className="card-title">{card.title}</div>
            </div>
            <div className="card-actions">
              <button className="edit-button">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
