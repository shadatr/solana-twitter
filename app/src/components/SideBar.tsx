import React from 'react'
import { HiOutlineUsers } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { GrChat } from "react-icons/gr";
import { TiHomeOutline } from "react-icons/ti";
import assets from "../assets";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col items-start space-y-2 w-[250px] p-10">
      <Link
        to="/"
        className={` text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/") && "font-black"
        }`}
      >
        <img width={50} height={50} src={assets.logo} />
      </Link>
      <Link
        to="/"
        className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/") && "font-black"
        }`}
      >
        <TiHomeOutline size={40} className={`${isActive("/") &&'text-babyBlue'}`} />
        <p>Home</p>
      </Link>
      <Link
        to="/topics"
        className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/topics") && "font-black"
        }`}
      >
        <GrChat size={40} className={`${isActive("/topics") &&'text-babyBlue'}`} />
        <p>Topics</p>
      </Link>
      <Link
        to="/users"
        className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/users") && "font-black"
        }`}
      >
        <HiOutlineUsers size={40} className={`${isActive("/users") &&'text-babyBlue'}`} />
        <p>Users</p>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/profile") && "font-black"
        }`}
      >
        <LuUser2 size={40} className={`${isActive("/profile") &&'text-babyBlue'}`}  />
        <p>Profile</p>
      </Link>
    </div>
  );
};

export default SideBar;
