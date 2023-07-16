import { apiClient } from "../../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AlbumsExplore() {
    const [album, setAlbum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiClient.get("browse/new-releases?limit=6");
            setAlbum(data.albums.items);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
      return (
        <div className="xl:col-span-5 p-4 bg-white rounded-lg shadow-xs dark:bg-[#111111]">
          <div className="flex justify-between">
            <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-200">
              New Release
            </h4>
            <div className="text-gray-200 text-sm tracking-wide"></div>
          </div>
          <div className="overflow-x-auto py-4">
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="w-[85px] mr-3 flex-none" key={i}>
                  <div className="animate-pulse bg-gray-300 rounded-md w-full h-20"></div>
                  <div className="w-full text-xs mt-2 xl:text-center">
                    <div className="animate-pulse bg-gray-300 w-2/3 h-4 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className="xl:col-span-5 p-4 bg-white rounded-lg shadow-xs dark:bg-[#111111]">
            <div className="flex justify-between">
                <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-200">
                    New Release
                </h4>
                <Link to="/albums" className="text-gray-200 text-sm tracking-wide">
                    see all
                </Link>
            </div>
            <div className="overflow-x-auto py-4">
                <div className="flex justify-between">
                    {album.map((m, i) => (
                        <div className="w-[85px] mr-3 flex-none" key={i}>
                            <Link to={`/album/${m.id}`}>
                                <img
                                    src={m.images[0].url}
                                    className="rounded-md w-full h-20"
                                    alt=""
                                />
                            </Link>
                            <div className="w-full text-xs mt-2 xl:text-center">
                                <Link
                                    to={`/album/${m.id}`}
                                    className="text-white font-semibold capitalize tracking-wide"
                                >
                                    {m.name.length >= 12
                                        ? m.name.substring(0, 12) + ".."
                                        : m.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
