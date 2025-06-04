import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log("Error during logout: ", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="h-[10vh] w-full">
      <div>
        <BiLogOutCircle
          className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-8"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
