import React from 'react'
import { Main } from '../../layouts'
import { HeaderExplore, AlbumsExplore, GenresExplore, Player, TracksExplore } from '../../components';
import { useTitle } from "react-use";

export default function Explore() {
  useTitle("Explore");
  return (
    <Main>
      <HeaderExplore />
      <div className="container px-4 bg-[#080808] ">
        <div className="grid gap-3 pb-9 grid-cols-1 xl:grid-cols-7">
          <AlbumsExplore />
          <Player />
          <GenresExplore />
          <TracksExplore />
        </div>
      </div>
    </Main>
  )
}
