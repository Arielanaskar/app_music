import { FaRegClock } from "react-icons/fa";
import { useTitle } from "react-use";
import { useParams } from "react-router-dom";
import { Main } from "../../layouts";
import { HeaderAlbum, TracksAlbum } from "../../components";
import { useEffect, useState } from "react";
import apiClient from "../../api";

export default function DetailAlbums() {
  const [ nameAlbum, setNameAlbum ] = useState([]);
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) {
        const fetchData = async() => {
           const data = await apiClient.get(`albums/${albumId}`)
           setNameAlbum(data.name)
        }
        fetchData();
    }
  }, [albumId])

  useTitle(nameAlbum +' - Album');
  
  return (
    <Main>
      <div className="container">
        <HeaderAlbum id={albumId} />
        <div className="px-5 py-8">
          <table className="song-table w-[1080px] border-collapse dark:text-white">
            <thead>
              <tr className="font-bold">
                <th>
                  <pre> #</pre>
                </th>
                <th>Title</th>
                <th>
                  <FaRegClock />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TracksAlbum id={albumId} />
            </tbody>
          </table>
        </div>
      </div>
    </Main>
  );
}
