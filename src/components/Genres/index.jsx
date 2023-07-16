import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api";
import { color, images } from "./asset";

export default function Genre() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("cachedGenre");
      if (cachedData) {
        setGenres(JSON.parse(cachedData));
      } else {
        const dataGenre = await apiClient.get(
          "recommendations/available-genre-seeds"
        );
        setGenres(dataGenre.genres);
        localStorage.setItem("cachedGenre", JSON.stringify(dataGenre.genres));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse w-[250px] bg-gray-300 rounded overflow-hidden h-[250px]"
          ></div>
        ))}
      </>
    );
  }

  return (
    <>
      {genres.slice(0, 100).map((m, i) => (
        <Link
          key={i}
          to={`/genre/${m}`}
          className={`relative w-[250px] h-[250px] flex flex-col justify-between cursor-pointer overflow-hidden rounded-[0.5rem] p-[1.5rem]`}
          style={{
            background: `${color[i]}`,
          }}
        >
          <h2 className="text-2xl font-semibold text-white">{m}</h2>

          <img
            className="w-[115px] h-[115px] transform rotate-[14deg] absolute top-[54%] -right-[5%] self-end"
            src={images[i]}
            alt=""
          />
        </Link>
      ))}
    </>
  );
}