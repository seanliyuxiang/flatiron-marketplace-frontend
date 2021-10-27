import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import ItemCardContainer from "./ItemCardContainer";
import NewItemForm from "./NewItemForm";

function App() {
  return (
    <div className= "app">
      <Header />
      <NavBar />
      <Home />
      <ItemCardContainer />
      <NewItemForm />
    </div>
  );
}

export default App;
