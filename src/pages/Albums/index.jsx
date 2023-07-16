import React from 'react'
import { useTitle } from "react-use"
import { Album } from '../../components';
import { Main } from '../../layouts';

export default function Albums() {
  useTitle("Albums")
  return (
    <Main>
      <div className="pl-5 playlist-header flex h-[100px] items-end pb-6">
        <div className="playlist-info">
          <h1 className="text-[2rem] text-white font-bold">
            New Albums & Singles
          </h1>
        </div>
      </div>
      <div className="container px-5 mt-6 mb-10 overflow-hidden">
        <div className="grid grid-cols-4 gap-y-10 gap-x-5 w-[1080px] overflow-hidden">
          <Album />
        </div>
      </div>
    </Main>
  );
}