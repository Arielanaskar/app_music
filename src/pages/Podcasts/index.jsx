import { Main } from "../../layouts";
import { useTitle } from "react-use";
import { Podcast } from "../../components";
import { Link } from "react-router-dom";

export default function Podcasts() {
  useTitle("Podcasts");
  const refresh_token = localStorage.getItem("refresh_token");
  const baseURL = window.location.origin;

  if (!refresh_token) {
    return (
      <Main>
        <div className="w-full h-full flex justify-center items-center">
          <div className="mb-16 mr-10 flex flex-col items-center">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="logo-spotify"
              className="w-[200px]"
            />
            <div className="text-white font-[600] mt-5">
              The page requires logging in to a Spotify account.
            </div>
            <Link
              to={`https://accounts.spotify.com/authorize?client_id=2f8f49f0e6f245b7aa03d5a45aa92c18&redirect_uri=${baseURL}/callback&scope=user-read-playback-position+user-read-private&response_type=code&show_dialog=true`}
              className="cursor-pointer"
            >
              <div className="py-[10px] px-0 bg-[#fefefe] rounded-full w-[200px] text-center font-[600] mt-[15%] text-[#1f1f1f]">
                LOG IN
              </div>
            </Link>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="pl-5 playlist-header flex h-[100px] items-end pb-6">
        <div className="playlist-info">
          <h1 className="text-[2rem] text-white font-bold">
            Most Popular Podcasts
          </h1>
        </div>
      </div>
      <div className="container py-8 px-4 overflow-hidden">
        <div className="grid grid-cols-4 gap-y-4 gap-x-6 w-[1083px] overflow-hidden">
          {window.localStorage.getItem("refresh_token") ? <Podcast /> : ""}
        </div>
      </div>
    </Main>
  );
}
