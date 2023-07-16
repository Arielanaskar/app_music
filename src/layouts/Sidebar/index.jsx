import React from 'react'
import {
  FaCompass,
  FaVolumeDown,
  FaCompactDisc,
  FaMicrophone,
  FaHeadphones,
  FaBookmark,
  FaHeart,
  FaUndoAlt,
} from 'react-icons/fa';
import { SidebarLink } from '../../components';

export default function Sidebar() {
  return (
    <>
      <img src="/images/logo2.png" alt="logo" className="w-[200px]" />
      <ul className="mt-14">
        <li className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#8D8D98]">
          MENU
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink to="/" active={window.location.pathname === "/"}>
            <FaCompass />
            <span className="ml-4">Explore</span>
          </SidebarLink>
        </li>
      </ul>

      <ul>
        <li className="relative px-6 py-3">
          <SidebarLink
            to="/genres"
            active={window.location.pathname === "/genres" || window.location.pathname.startsWith("/genre/") || window.location.pathname.startsWith("/playlist/")}
          >
            <FaVolumeDown />
            <span className="ml-4">Genres</span>
          </SidebarLink>
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            to="/albums"
            active={window.location.pathname === "/albums" || window.location.pathname.startsWith("/album/")}
          >
            <FaCompactDisc />
            <span className="ml-4">Albums</span>
          </SidebarLink>
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            to="/artists"
            active={window.location.pathname === "/artists" || window.location.pathname.startsWith("/artist/")}
          >
            <FaMicrophone />
            <span className="ml-4">Artists</span>
          </SidebarLink>
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            to="/podcasts"
            active={window.location.pathname === "/podcasts" || window.location.pathname.startsWith("/podcast/")}
          >
            <FaHeadphones />
            <span className="ml-4 cursor-pointer">Podcast</span>
          </SidebarLink>
        </li>
      </ul>

      <ul className="mt-4">
        <li className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#8D8D98]">
          LIBRARY
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:text-white"
            to="#"
            active={window.location.pathname === "/recent"}
          >
            <FaUndoAlt />
            <span className="ml-4">Recent</span>
          </SidebarLink>
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:text-white"
            to="#"
            active={window.location.pathname === "/saveAlbums"}
          >
            <FaBookmark />
            <span className="ml-4">Albums</span>
          </SidebarLink>
        </li>
        <li className="relative px-6 py-3">
          <SidebarLink
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:text-white"
            to="#"
            active={window.location.pathname === "/favourites"}
          >
            <FaHeart />
            <span className="ml-4">Favourites</span>
          </SidebarLink>
        </li>
      </ul>
    </>
  );
}