import './App.css';
import Home from './Components/Home';
import Journeys from './Components/Journeys';
import CreateJourney from './Components/CreateJourney';
import Navbar from './Components/Navbar';
import UserContent from './Components/UserContent';
import LoginPage from './Components/Login-page';
import SignUp from './Components/SignUp';
import PublicCards from './Components/Public-Cards';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';


function App() {

  const [userData, setUserData] = useState({});

  const cardClick = (ele)=>{
    setUserData(ele);
  }

  useEffect(() => {}, []);

  const userProfile = (event)=>{
    localStorage.setItem("profile",event);
  }

  const name = localStorage.getItem("profile");

  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<><LoginPage userProfile={userProfile}/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/signup" element={<><SignUp/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/home" element={<><Navbar profile={name}/><Home/><Journeys cardClick={cardClick}/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/createjourney" element={<><Navbar profile={name}/><CreateJourney/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/usercomponent" element={<><Navbar/><UserContent userData={userData}/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/public-cards" element={<><Navbar/><PublicCards cardClick={cardClick}/></>}>
          </Route>
        </Routes>

        <Routes>
          <Route path="/map" element={<><Navbar/><Map/></>}>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
