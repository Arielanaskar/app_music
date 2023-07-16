import { useTitle } from "react-use";
import { Main } from "../../layouts";
import { FaRegClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { HeaderPlaylist, TracksPlaylist } from "../../components";
import apiClient from "../../api";
import { useEffect, useState } from "react";

export default function DetailPlaylist() {
  const [namePlaylist, setNamePlaylist] = useState([]);
  const { playlistId } = useParams();
  
  useEffect(() => {
    if (playlistId) {
      const fetchData = async () => {
        const data = await apiClient.get(`playlists/${playlistId}`);
        setNamePlaylist(data.name);
      };
      fetchData();
    }
  }, [playlistId]);

  useTitle(namePlaylist + "- Playlist");

  return (
    <Main>
      <div className="container">
        <HeaderPlaylist id={playlistId} />
        <div className="px-4">
          <table className="song-table w-full mt-[2rem] border-collapse mb-10 dark:text-white">
            <thead>
              <tr className="font-bold">
                <th>
                  <pre> #</pre>
                </th>
                <th>Title</th>
                <th>Album</th>
                <th>Date Added</th>
                <th>
                  <FaRegClock />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TracksPlaylist id={playlistId} />
            </tbody>
          </table>
        </div>
      </div>
    </Main>
  );
}
