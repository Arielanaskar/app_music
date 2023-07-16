import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function Main({ children }) {
  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <aside className="z-20 w-64 overflow-y-auto bg-white dark:bg-[#111111] block flex-shrink-0">
          <div className="py-4 text-gray-500 dark:text-gray-400">
            <Sidebar />
          </div>
        </aside>
        <div className="relative flex flex-col flex-1 w-full overflow-hidden">
          <main className="h-full overflow-hidden">
            <div className="absolute banner inset-0 grayscale -z-10"></div>
            <div className="relative container mx-auto">
              <Header />
              <div
                className="main-scroll h-[calc(100vh-4rem)] overflow-y-auto bg-[#080808] relative"
                style={{ minWidth: "768px" }}
              >
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Main;
