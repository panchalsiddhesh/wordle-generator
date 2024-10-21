import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./scss/main.scss"; // scss file

// Pages imported with lazy loading
const App = lazy(() => import("./App"));
const ErrorPage = lazy(() => import("./components/pages/Error"));
const WordleGenerator = lazy(() =>
  import("./components/pages/WordleGenerator")
);
const WordleMainGame = lazy(() => import("./components/pages/WordleMainGame"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/wordle-generator"
      element={<App />}
      errorElement={<ErrorPage />}
    >
      <Route
        index
        path=""
        element={<WordleGenerator />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/game/:id"
        element={<WordleMainGame />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/error"
        element={<ErrorPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
