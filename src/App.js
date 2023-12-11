import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebConfigurator from "./components/WebConfigurator";

import "./app.scss";

const router = createBrowserRouter([
  {
    path: "/ui-manager",
    element: <WebConfigurator />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
