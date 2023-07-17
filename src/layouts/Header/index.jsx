import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { apiClient } from "../../api";
import AudioPlayerContext from "../../context/audioContext";

export default function Header() {
  const { user, setUser } = useContext(AudioPlayerContext);
  const baseURL = window.location.origin;

  useEffect(() => {
    if (
      window.localStorage.length !== 0 &&
      window.localStorage.getItem("refresh_token")
    ) {
      if (!window.localStorage.getItem("account")) {
        const fetchData = async () => {
          const data = await apiClient.get("me");
          setUser(data);
          window.localStorage.setItem("account", JSON.stringify(data));
        };
        fetchData();
      } else {
        setUser(JSON.parse(window.localStorage.getItem("account")));
      }
    }
  }, []);

  return (
    <header className="z-10 py-4 bg-transparent overflow-hidden dark:bg-[#111111]">
      <div className="container flex items-center justify-between h-full px-6 mx-auto w-[1110px]">
        <button
          className="p-1 mr-5 -ml-1 rounded-md hidden outline-none"
          aria-label="Menu"
        >
          <FiMenu size="1.6rem" />
        </button>
        <ul className="w-56 flex space-x-5 text-white">
          <li>
            <Link
              className="font-semibold transition-colors duration-150 text-white"
              to=""
            >
              MUSIC
            </Link>
          </li>
          <li>
            <Link
              className="font-semibold transition-colors duration-150 text-white"
              to=""
            >
              PODCAST
            </Link>
          </li>
        </ul>
        <div className="h-12 flex justify-center flex-1 mr-32 text-white">
          <div className="relative w-[18rem] max-w-xl mr-8 h-full">
            <div className="absolute inset-y-0 flex items-center pl-4">
              <FaSearch />
            </div>
            <input
              className="w-full h-full pl-12 rounded-full text-white text-sm border-0 bg-[#333435] focus:border-none focus:outline-none form-input"
              type="text"
              placeholder="Type here to search"
              aria-label="Search"
            />
          </div>
        </div>
        <div
          className={`
                        h-fit 
            `}
        >
          <div className="w-full mb-4 flex items-center justify-between">
            <div className="flex justify-between items-center gap-x-4">
              {window.localStorage.length !== 0 &&
              window.localStorage.getItem("refresh_token") ? (
                <>
                  <div>
                    <button
                      className="
                            w-full 
                            rounded-full 
                            border
                            border-transparent
                            px-6 
                            py-2 
                            disabled:cursor-not-allowed 
                            disabled:opacity-50
                            hover:opacity-75
                            transition
                            text-black
                            bg-white
                            font-medium
                            flex
                        "
                    >
                      {user?.display_name}
                      <img
                        src={user?.images ? user.images[0].url : ""}
                        alt=""
                        className="w-[28px] h-[28px] rounded-full ml-3"
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <button
                      className="
                            w-full 
                            rounded-full 
                            border
                            border-transparent
                            px-6 
                            py-2 
                            disabled:cursor-not-allowed 
                            disabled:opacity-50
                            hover:opacity-75
                            transition
                            bg-transparent 
                            text-neutral-300 
                            font-medium
                        "
                    >
                      Sign up
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        (window.location.href = `https://accounts.spotify.com/authorize?client_id=2f8f49f0e6f245b7aa03d5a45aa92c18&redirect_uri=${baseURL}/callback&scope=user-read-playback-position+user-read-private&response_type=code&show_dialog=true`)
                      }
                      className="
                            w-full 
                            rounded-full 
                            border
                            border-transparent
                            disabled:cursor-not-allowed 
                            disabled:opacity-50
                            text-black
                            font-bold
                            hover:opacity-75
                            transition
                            bg-white px-6 py-2
                        "
                    >
                      Log in
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
