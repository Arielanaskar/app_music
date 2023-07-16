import { Main } from "../../layouts";
import { useTitle } from "react-use";
import { Artist } from "../../components";

export default function Artists() {
  useTitle('Artists');
  return (
    <Main>
      <div className="pl-5 playlist-header flex h-[100px] items-end pb-6">
        <div className="playlist-info">
          <h1 className="text-[2rem] text-white font-bold">
            Most Popular Artists
          </h1>
        </div>
      </div>
      <div className="container py-8 px-5 mb-7 overflow-hidden">
        <div className="grid grid-cols-4 gap-y-8 gap-x-5  w-[1070px] overflow-hidden">
          <Artist />
        </div>
      </div>
    </Main>
  );
}