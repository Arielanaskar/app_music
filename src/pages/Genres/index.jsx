import { Main } from "../../layouts";
import { useTitle } from "react-use";
import { Genre } from "../../components";

export default function Genres() {
  useTitle("Genres");
  return (
    <Main>
      <div className="container px-4 py-9 overflow-hidden">
        <div className="grid grid-cols-4 gap-x-2 gap-y-7 w-[1083px] overflow-hidden">
            <Genre />
        </div>
      </div>
    </Main>
  );
}
