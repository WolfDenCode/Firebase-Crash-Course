import { useState } from "react";
import Card from "./components/Card";
import "./App.css";
import Geralt_of_Rivia from "./assets/images/cards/Geralt_of_Rivia.jpg";
import Cirilla from "./assets/images/cards/Ciri.jpg";
import Yennefer from "./assets/images/cards/Yennefer.jpg";
import Gaunter from "./assets/images/cards/Gaunter.jpg";
import Aguara from "./assets/images/cards/Aguara.jpg";
import Geralt_Aard from "./assets/images/cards/Geralt_Aard.jpg";
import Dandelion from "./assets/images/cards/Dandelion.jpg";
import AdminPanel from "./components/AdminPanel";
function App() {
  return (
    <>
      <div className="card-container">
        <Card
          title="Geralt of Rivia"
          power={15}
          image={Geralt_of_Rivia} // Replace with actual image path
          type="melee"
        />
        <Card
          title="Cirilla"
          power={15}
          image={Cirilla} // Replace with actual image path
          type="melee"
        />
        <Card
          title="Yennefer of Vengerberg"
          power={7}
          image={Yennefer} // Replace with actual image path
          type="ranged"
        />
        <Card
          title="Dandelion"
          power={2}
          image={Dandelion} // Replace with actual image path
          type="ranged"
        />
        <Card
          title="Aguara"
          power={6}
          image={Aguara} // Replace with actual image path
          type="siege"
        />
        <Card
          title="Geralt Aard"
          power={5}
          image={Geralt_Aard} // Replace with actual image path
          type="ranged"
        />
        <Card
          title="Gaunter O'Dimm"
          power={8}
          image={Gaunter} // Replace with actual image path
          type="siege"
        />
      </div>
      <AdminPanel></AdminPanel>
    </>
  );
}

export default App;
