import React from 'react'
import { HiOutlineUsers } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { GrChat } from "react-icons/gr";
import { TiHomeOutline } from "react-icons/ti";
import assets from "../assets";
import { Link, useLocation } from "react-router-dom";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const SideBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { connected } = useWallet()

  return (
    <div className="flex flex-col items-start mt-20 space-y-4 w-[250px] p-10">
      {/* <Link
        to="/"
        className={` text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/") && "font-black"
        }`}
      >
        <img width={50} height={50} src={assets.logo} />
      </Link> */}
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
      {connected &&
      <Link
        to="/profile"
        className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
          isActive("/profile") && "font-black"
        }`}
      >
        <LuUser2 size={40} className={`${isActive("/profile") &&'text-babyBlue'}`}  />
        <p>Profile</p>
      </Link>
      }
      <WalletMultiButton className='bg-babyBlue'style={{background: "#007F91", borderRadius: "30px"}}/>
    </div>
  );
};

export default SideBar;
