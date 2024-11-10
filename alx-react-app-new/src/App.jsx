import "./App.css";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";

import Header from "./components/Header";
import Counter from "./components/Counter";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Counter />
      <MainContent />
      <WelcomeMessage />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Footer />
    </>
  );
}

export default App;
