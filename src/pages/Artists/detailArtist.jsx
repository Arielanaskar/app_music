import React from "react";
import { useTitle } from "react-use";
import { useEffect, useState } from "react";
import apiClient from "../../api";
import { Main } from "../../layouts";
import { useParams } from "react-router-dom";
import { HeaderArtist, TracksArtist, AlbumArtist } from "../../components";

export default function DetailArtist() {
  const { artistId } = useParams()
  const [artist, setArtist] = useState({});
  const [activeTab, setActiveTab] = useState("albums");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (artistId) {
        const fetchData = async () => {
          const dataArtist = await apiClient.get(`artists/${artistId}`);
          setArtist(dataArtist);
        };
        fetchData();
    }
  }, [artistId]);

  useTitle(artist.name !== undefined ? artist.name + " - Artist" : " - Artist");

  return (
    <Main>
      <div className="container">
        <HeaderArtist artist={artist} />
        <div className="px-4">
          <h1 className="pl-3 text-xl font-bold text-white">Popular Track</h1>
          <table className="song-table-2 w-full mt-[1.5rem] border-collapse mb-10 dark:text-white">
            <thead>
              <tr className="font-bold">
                <th className="border-none"></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TracksArtist id={artistId} />
            </tbody>
          </table>
          <section className="py-5 px-4">
            <div className="flex flex-col justify-between mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold mr-4 text-white">
                  Discography
                </h2>
              </div>
              <div className="flex mt-6 space-x-4 text-sm font-semibold">
                <button
                  role="checkbox"
                  aria-checked={activeTab === "albums"}
                  className={`px-3 py-2 rounded-full ${
                    activeTab === "albums"
                      ? "bg-[#9575DE] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleTabClick("albums")}
                >
                  Albums
                </button>
                <button
                  role="checkbox"
                  aria-checked={activeTab === "single"}
                  className={`px-3 py-2 rounded-full ${
                    activeTab === "single"
                      ? "bg-[#9575DE] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleTabClick("single")}
                >
                  Single
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 my-10 gap-x-8 gap-y-8">
              {activeTab === "single" && (
                <AlbumArtist id={artistId} type="single" />
              )}
              {activeTab === "albums" && (
                <AlbumArtist id={artistId} />
              )}
            </div>
          </section>
        </div>
      </div>
    </Main>
  );
}
