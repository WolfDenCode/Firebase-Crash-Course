import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { GiArrowCluster, GiCatapult, GiAncientSword } from "react-icons/gi";
import "./AdminPanel.css";
import Geralt from "../assets/images/cards/Geralt_of_Rivia.jpg";

const AdminPanel = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Geralt of Rivia",
      power: 15,
      type: "melee",
      image: Geralt,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newCard, setNewCard] = useState({
    id: null,
    title: "",
    power: "",
    type: "melee",
    image: "",
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

  const handleAddCard = () => {
    const id = Date.now();
    const card = { ...newCard, id };
    setCards([...cards, card]);
    setNewCard({ id: null, title: "", power: "", type: "melee", image: "" });
    console.log("Card Created:", card);
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    console.log("Card Deleted:", id);
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setNewCard(card);
  };

  const handleSaveEdit = () => {
    const updatedCards = cards.map((card) =>
      card.id === newCard.id ? newCard : card
    );
    setCards(updatedCards);
    setIsEditing(false);
    setNewCard({ id: null, title: "", power: "", type: "melee", image: "" });
    console.log("Card Updated:", newCard);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewCard({ id: null, title: "", power: "", type: "melee", image: "" });
    console.log("Edit Cancelled");
  };

  return (
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
            <button
              className="delete-icon"
              onClick={() => handleDeleteCard(card.id)}
            >
              <FaTimes />
            </button>
            <div className="card-title">{card.title}</div>
          </div>
          <div className="card-actions">
            <button
              className="edit-button"
              onClick={() => handleEditCard(card)}
            >
              <FaEdit />
            </button>
          </div>
        </div>
      ))}

      <div className="add-card">
        <h3>{isEditing ? "Edit Card" : "Add New Card"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Power"
          value={newCard.power}
          onChange={(e) => setNewCard({ ...newCard, power: e.target.value })}
        />
        <select
          value={newCard.type}
          onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
        >
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
          <option value="siege">Siege</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={newCard.image}
          onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
        />
        <button onClick={isEditing ? handleSaveEdit : handleAddCard}>
          {isEditing ? (
            "Save Changes"
          ) : (
            <>
              <FaPlus /> Add Card
            </>
          )}
        </button>
        {isEditing && (
          <button className="cancel-edit" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
