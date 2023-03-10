import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss"

import { createBrowserRouter,
  RouterProvider } from 'react-router-dom';
import DialogueCanvas from "./DialogueCanvas"
import Game from './App';
import YouLose from './YouLose';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([

  {
    path: "/3-000-Meters-Above",
    element: <DialogueCanvas/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/3-000-Meters-Above/play",
    element: <Game/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/3-000-Meters-Above/play/youlose",
    element: <YouLose/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


