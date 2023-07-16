import { useTitle } from "react-use";
import { Main } from "../../layouts";
import { useParams } from "react-router-dom";
import { Playlist } from "../../components";

export default function Playlists() { 
  const { genreName } = useParams();
  useTitle('Playlists -'+ genreName)
  return (
    <Main>
      <div className="container">
        <div
          className="playlist-header before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:-z-[1] before:h-full relative before:bg-cover before:bg-center before:bg-no-reapet flex h-[100px] items-end p-[2rem] before:rounded-lg"
          style={{
            backgroundImage: `url('https://source.unsplash.com/1200x400?${genreName}+music')`,
          }}
        >
          <div className="playlist-info flex items-center">
            <h1 className="text-[2rem] text-white font-bold">{genreName}</h1>
            <p className="text-white text-sm ml-4">
              Discover the best {genreName} playlist
            </p>
          </div>
        </div>

        <div className="container px-4 py-8">
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 w-[1075px]">
            <Playlist genre={genreName} />
          </div>
        </div>
      </div>
    </Main>
  );
}