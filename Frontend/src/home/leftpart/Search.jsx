import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {

  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const {selectedConversation ,setSelectedConversation} = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find( 
      (user) => user.fullname?.toLowerCase() === search.toLowerCase()
      // (user) => user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    }else {
      toast.error("User not found");
      setSearch("");
    }

  }

  return (
    <div className=" h-[10vh] ">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="border-none rounded-lg bg-slate-900 w-[90%] ">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-3 py-2 outline-none "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <FaSearch className="text-4xl p-1 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
