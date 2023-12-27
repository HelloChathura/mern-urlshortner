// StatsComponent.js
import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";

export default function StatsComponent() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  return (
    <section class="bg-indigo-900 h-screen flex items-center justify-center">
        <Notifications />
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500"></div>
          <div class="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 class="text-gray-900 text-lg font-bold">
                  User Clicked Count
                </h2>
                <h3 class="mt-2 text-xl font-bold text-cyan-500 text-left">
                  <a href="http//:localhost:5173/UvcDF">http//:localhost:5173/UvcDF</a>
                </h3>
                <p class="text-sm font-semibold text-gray-400">
                  You can check this by visiting <u><a href="https://www.google.lk">Click Here</a></u>
                </p>
                <button class="text-sm mt-6 px-4 py-2 bg-cyan-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none" onClick={() => navigate("/")}>
                  Shorten Another URL
                </button> &nbsp;
                <button class="text-sm mt-6 px-4 py-2 bg-indigo-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none" onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText("http://localhost:5173/"+ shortCode.substring(0, shortCode.length-1));
                      let myColor = { background: "#0E1717", text: "#FFFFFF" };
                      notify.show("Link Copied!!", "custom", 5000, myColor);
                    }}>
                  Copy
                </button>
              </div>
              <div class="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-32 h-32  rounded-full shadow-2xl shadow-cyan-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 class="text-white text-6xl">1</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
