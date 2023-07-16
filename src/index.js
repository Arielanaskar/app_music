import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


const isDesktop = window.innerWidth >= 1366;
const root = ReactDOM.createRoot(document.getElementById('root'));

if (isDesktop) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  root.render(
    <div className="w-full h-[100vh] flex justify-center items-center font-bold text-white bg-[#080808] text-center">
      <h1>
        Sorry, this application is only available on desktop <br /> with a
        screen size min 1366 for a better experience, as it is not responsive
        yet. <br/>
        
      </h1>
    </div>
  );
}

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

reportWebVitals();
