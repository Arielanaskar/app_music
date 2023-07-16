import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../../api";

export default function GenresExplore() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const num_random = [64, 53, 40, 77, 54, 63];

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiClient.get(
        "recommendations/available-genre-seeds"
      );
      setGenres(data.genres);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="col-span-2 bg-white rounded-lg shadow-md dark:bg-[#111111]">
        <div className="flex justify-between p-4">
          <h4 className="font-semibold text-gray-600 dark:text-gray-200">
            Genres
          </h4>
          <div className="text-gray-200 text-sm tracking-wide"></div>
        </div>
        <div className="flex flex-wrap mt-2 pl-2">
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={`py-8 m-[7.5px] text-sm rounded-lg text-white font-bold animate-pulse bg-gray-300`}
              style={{
                paddingLeft: `${num_random[i]}px`,
                paddingRight: `${num_random[i]}px`,
              }}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  const color = [
    "#527E9C",
    "#A79E8A",
    "#A15341",
    "#0C474C",
    "#A58A9E",
    "#554AA5",
  ];

  return (
    <div className="col-span-2 bg-white rounded-lg shadow-md dark:bg-[#111111] p-4">
      <div className="flex justify-between">
        <h4 className="font-semibold text-gray-600 dark:text-gray-200">
          Genres
        </h4>
        <div className="flex items-center">
          <Link to="/genres" className="text-gray-200 text-sm">
            see all
          </Link>
        </div>
      </div>
      <div className="flex gap-x-3 gap-y-3 flex-wrap mt-8">
        {genres.slice(0, 6).map((m, i) => (
          <div
            key={i}
            className="text-white rounded-lg py-5 px-7 text-sm font-bold cursor-default"
            style={{
              background: `${color[i]}`,
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
