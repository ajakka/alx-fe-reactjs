import "./App.css";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";

import UserContext from './UserContext';

import Header from "./components/Header";
import Counter from "./components/Counter";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import ProfilePage from "./components/ProfilePage";

const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContext.Provider value={userData} >
      <Header />
      <Counter />
      <MainContent />
      <WelcomeMessage />
      <ProfilePage/>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
