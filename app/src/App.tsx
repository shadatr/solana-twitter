import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Users from "./components/Users";
import Profile from "./components/profile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex w-screen min-h-screen justify-center ">
      <Router>
        <div className="flex justify-center lg:w-[1600px] sm:w-[350px]">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topicId" element={<Topics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      </Router>
    </div>
  );
}

export default App;
