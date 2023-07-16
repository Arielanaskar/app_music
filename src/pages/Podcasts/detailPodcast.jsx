import { Main } from "../../layouts";
import { HeaderPodcast, TracksPodcast } from "../../components";
import { useParams } from "react-router-dom";

export default function DetailPodcast() {
  const { podcastId } = useParams();
  return (
    <Main>
      <HeaderPodcast id={podcastId} />
      <div className="container my-8">
        <table className="ml-7 border-collapse w-max">
          <thead>
            <tr>
              <th className="text-left text-2xl font-bold text-white py-5">All Episodes</th>
              <th></th>
            </tr>
          </thead>
          <br />
          <tbody>
            <TracksPodcast id={podcastId} />
          </tbody>
        </table>
      </div>
    </Main>
  );
}
