import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import { db } from "./config/firebase";
import AdminPanel from "./components/AdminPanel";
import { getDocs, collection, query } from "firebase/firestore";

function App() {
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

  return (
    <>
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            power={card.power}
            image={card.image}
            type={card.type}
          />
        ))}
      </div>
      <AdminPanel />
    </>
  );
}

export default App;
