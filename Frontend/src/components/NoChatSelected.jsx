import React from 'react'
import { useAuth } from "../context/Authprovider.jsx";
import { IoMenu } from "react-icons/io5";

function NoChatSelected() {
  const [authUser] = useAuth();
  return (
      <>
        <div className="relative">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-2 "
          >
            <IoMenu className="text-white text-3xl" />
          </label>
          <div className="flex h-screen items-center justify-center p-2">
            <h1 className="text-center ">
              Welcome{" "}
              <span className="font-semibold text-xl">
                {authUser.user.fullname}
              </span>
              <br />
              No chat selected, please start conversation by selecting anyone to
              your contacts
            </h1>
          </div>
        </div>
      </>
    );
}

export default NoChatSelected;