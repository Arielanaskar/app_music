import React, { useEffect, useState } from 'react'
import apiClient from '../../api'
import { FaEllipsisH } from "react-icons/fa"

export default function HeaderPodcast({ id }) {
  const [podcast, setPodcast] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
        const fetchData = async () => {
            const data = await apiClient.get(`shows/${id}`);
            setPodcast(data)
            setIsLoading(false);
        }
        fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <>
        <div className="h-[300px] flex items-end p-[2rem] relative">
          <div className="playlist-info flex items-end z-10">
            <div className="animate-pulse rounded bg-gray-300 w-[210px] h-[210px] mr-[1.5rem]"></div>
            <div className="flex flex-col">
              <div className="animate-pulse bg-gray-300 w-1/4 h-[16px] rounded mb-3"></div>
              <div className="animate-pulse bg-gray-300 w-[200px] h-[35px] rounded mb-6"></div>
              <div className="animate-pulse bg-gray-300 w-3/4 h-[20px] rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex mb-10">
          <div className="w-[80px] animate-pulse text-xs py-3 px-5 font-bold rounded ml-7 bg-gray-300"></div>
          <button className="text-gray-300 animate-pulse text-xl ml-7 flex items-center">
            <FaEllipsisH className="cursor-pointer" />
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-2xl ml-7 mb-5">About</h1>
          <div className="ml-7 w-[900px] h-[15px] bg-gray-300 rounded animate-pulse mb-3"></div>
          <div className="ml-7 w-[900px] h-[15px] bg-gray-300 rounded animate-pulse mb-3"></div>
          <div className="ml-7 w-[500px] h-[15px] bg-gray-300 rounded animate-pulse"></div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <div className="playlist-header flex h-[300px] items-end p-[2rem] relative">
        <div className="absolute inset-0 z-0 bg-[#080808]"></div>
        <div className="playlist-info flex items-end z-10">
          <img
            className="w-[210px] h-[210px] object-cover mr-[1.5rem] rounded"
            src={podcast.images ? podcast.images[0].url : ""}
            alt={podcast?.name}
          />
          <div className="flex flex-col">
            <p className="text-lg text-white font-bold">Podcast</p>
            <h1 className="text-[2rem] text-white font-bold">
              {podcast?.name}
            </h1>
            <div className="text-sm mt-5 text-white font-bold flex items-center">
              <p>{podcast?.publisher}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-10">
        <button className="border text-white text-xs py-2 px-5 font-bold rounded ml-7">
          FOLLOW
        </button>
        <button className="text-white text-xl ml-7 flex items-center">
          <FaEllipsisH className="cursor-pointer" />
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-2xl ml-7 mb-5">About</h1>
        <div className="w-[900px]">
          <p className="text-gray-400 text-sm ml-7 text-justify">
            {podcast.description ? podcast.description.length > 478 ? podcast.description.substring(0,478) : podcast.description : ''}
          </p>
        </div>
      </div>
    </>
  );
}
