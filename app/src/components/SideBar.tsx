import React from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { GrChat } from "react-icons/gr";
import { TiHomeOutline, TiThMenu } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

const SideBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { connected } = useWallet();

  return (
    <div className="">
      <div className="flex">
        <div className="lg:hidden fixed">
          <Sheet >
            <SheetTrigger>
              <TiThMenu color="white" size="30" className="m-5" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription className="flex flex-col gap-5 p-2 text-secondary ">
                  <Link
                    to="/"
                    className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
                      isActive("/") && "font-black"
                    }`}
                  >
                    <TiHomeOutline
                      size={40}
                      className={`${isActive("/") && "text-babyBlue"}`}
                    />
                    <p>Home</p>
                  </Link>
                  <Link
                    to="/topics"
                    className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
                      isActive("/topics") && "font-black"
                    }`}
                  >
                    <GrChat
                      size={40}
                      className={`${isActive("/topics") && "text-babyBlue"}`}
                    />
                    <p>Topics</p>
                  </Link>
                  <Link
                    to="/users"
                    className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
                      isActive("/users") && "font-black"
                    }`}
                  >
                    <HiOutlineUsers
                      size={40}
                      className={`${isActive("/users") && "text-babyBlue"}`}
                    />
                    <p>Users</p>
                  </Link>
                  {connected && (
                    <Link
                      to="/profile"
                      className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
                        isActive("/profile") && "font-black"
                      }`}
                    >
                      <LuUser2
                        size={40}
                        className={`${isActive("/profile") && "text-babyBlue"}`}
                      />
                      <p>Profile</p>
                    </Link>
                  )}
                  <WalletMultiButton
                    className="bg-babyBlue"
                    style={{ background: "#007F91", borderRadius: "30px" }}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="sm:hidden lg:flex  flex-col items-start mt-20 space-y-4 w-[250px] p-10">
        <Link
          to="/"
          className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
            isActive("/") && "font-black"
          }`}
        >
          <TiHomeOutline
            size={40}
            className={`${isActive("/") && "text-babyBlue"}`}
          />
          <p>Home</p>
        </Link>
        <Link
          to="/topics"
          className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
            isActive("/topics") && "font-black"
          }`}
        >
          <GrChat
            size={40}
            className={`${isActive("/topics") && "text-babyBlue"}`}
          />
          <p>Topics</p>
        </Link>
        <Link
          to="/users"
          className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
            isActive("/users") && "font-black"
          }`}
        >
          <HiOutlineUsers
            size={40}
            className={`${isActive("/users") && "text-babyBlue"}`}
          />
          <p>Users</p>
        </Link>
        {connected && (
          <Link
            to="/profile"
            className={`flex flex-row gap-2 text-md items-center p-4 hover:bg-gray rounded-3xl ${
              isActive("/profile") && "font-black"
            }`}
          >
            <LuUser2
              size={40}
              className={`${isActive("/profile") && "text-babyBlue"}`}
            />
            <p>Profile</p>
          </Link>
        )}
        <WalletMultiButton
          className="bg-babyBlue"
          style={{ background: "#007F91", borderRadius: "30px" }}
        />
      </div>
    </div>
  );
};

export default SideBar;
