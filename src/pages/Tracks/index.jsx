import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { Track } from "../../components";
import { Main } from "../../layouts";

export default function Tracks() {
  return (
    <Main>
      <div>
        <div className="pl-5 playlist-header flex h-[100px] items-end pb-6 mb-8">
          <div className="playlist-info">
            <h1 className="text-[2rem] text-white font-bold">
              Top Hits Tracks Global
            </h1>
          </div>
        </div>
        <table className="song-table border-collapse dark:text-white mb-8">
          <thead>
            <tr className="font-bold">
              <th>
                <pre> #</pre>
              </th>
              <th>Title</th>
              <th>Album</th>
              <th>
                <FaRegClock />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Track />
          </tbody>
        </table>
      </div>
    </Main>
  );
}
