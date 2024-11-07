import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { GiArrowCluster, GiCatapult, GiAncientSword } from "react-icons/gi";
import { db, storage } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import "./AdminPanel.css";

const AdminPanel = () => {
  const CARDS_COLLECTION = collection(db, "cards");

  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const cardsCol = collection(db, "cards");
    const q = query(cardsCol);

    try {
      const cardsSnapshot = await getDocs(q);
      const temp = cardsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(temp);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, []);
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

  const handleAddCard = async () => {
    // const id = Date.now();
    // const card = { ...newCard, id };
    // setCards([...cards, card]);

    //First Step Solution, id = null

    // try {
    //   // Add the new card data to Firestore without specifying an id
    // const cardToAdd = { ...newCard };
    // delete cardToAdd.imageFile;
    //   const docRef = await addDoc(collection(db, "cards"), cardToAdd);

    //   // Firebase automatically assigns an id; you can access it with docRef.id
    //   console.log("Card added to Firestore with ID:", docRef.id);
    // } catch (error) {
    //   console.error("Error adding card to Firestore:", error);
    // }

    // ID in sync with firebase

    // Generate a unique document reference with an ID
    const docRef = doc(CARDS_COLLECTION); // creates a reference with a unique ID

    // Use docRef.id as your card ID in your local newCard object
    const newCardWithId = { ...newCard, id: docRef.id };
    // Delete it, because Firebase can't handle this type for a document
    delete newCardWithId.imageFile;
    try {
      // Upload the image file to Firebase Storage (if a file is selected)
      let imageUrl = "";
      if (newCard.imageFile) {
        const imageRef = ref(
          storage,
          `cards/${newCardWithId.id}/${newCard.imageName}`
        );
        await uploadBytes(imageRef, newCard.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      newCardWithId.image = imageUrl;
      // Use setDoc with the generated document reference
      await setDoc(docRef, newCardWithId);
      setCards([...cards, newCardWithId]);
      setNewCard({
        id: null,
        title: "",
        power: "",
        type: "melee",
        imageFile: null,
        imageName: "",
      });
      console.log("Card Created:", newCardWithId);
    } catch (error) {
      console.error("Error adding card to Firestore:", error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      // 1. Delete Firestore Document
      await deleteDoc(doc(CARDS_COLLECTION, id));
      console.log("Card Deleted from Firestore:", id);

      // 2. Delete Associated Folder in Firebase Storage
      const folderRef = ref(storage, `cards/${id}`);

      // List all items in the folder and delete each one
      const folderContents = await listAll(folderRef);
      const deletePromises = folderContents.items.map((itemRef) =>
        deleteObject(itemRef)
      );
      await Promise.all(deletePromises);
      console.log("Folder deleted from Firebase Storage:", `cards/${id}`);

      // Update local state
      const updatedCards = cards.filter((card) => card.id !== id);
      setCards(updatedCards);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setNewCard({ ...card, imageFile: null }); // Clear imageFile for editing mode
  };

  const handleSaveEdit = async () => {
    // Create a new object without `imageFile` to avoid uploading a file object to Firestore
    const { imageFile, ...cardDataToUpload } = newCard;

    try {
      // Update Firestore
      const cardDocRef = doc(CARDS_COLLECTION, newCard.id);
      await setDoc(cardDocRef, cardDataToUpload, { merge: true });
      console.log("Card Updated in Firestore:", newCard);

      // Update local state
      const updatedCards = cards.map((card) =>
        card.id === newCard.id ? newCard : card
      );
      setCards(updatedCards);

      // Reset editing state
      setIsEditing(false);
      setNewCard({
        id: null,
        title: "",
        power: "",
        type: "melee",
        imageFile: null,
        imageName: "",
      });
    } catch (error) {
      console.error("Error updating card in Firestore:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewCard({
      id: null,
      title: "",
      power: "",
      type: "melee",
      imageFile: null,
      imageName: "",
    });
    console.log("Edit Cancelled");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCard({ ...newCard, imageFile: file, imageName: file.name });
    }
  };

  return (
    <div className="admin-panel">
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

        {/* Image File Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newCard.imageName && <p>Selected Image: {newCard.imageName}</p>}

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
      </div>
    </div>
  );
};

export default AdminPanel;
