import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className=" w-[30%] bg-black text-gray-300">
      <Search />
      <div
        className="hide-scrollbar overflow-auto"
        style={{ minHeight: " calc(84vh - 4vh) " }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;
