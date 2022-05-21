import { Route, Routes, Link, useMatch } from "react-router-dom";

import Home from "./pages/Home";
import Issue from "./pages/Issue";
import AddIssue from "./pages/AddIssue";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/add", element: <AddIssue /> },
  { path: "/issue/:number", element: <Issue /> },
];

const App = () => {
  const isRootPath = useMatch({ path: "/", end: true });

  return (
    <>
      {!isRootPath && <Link to="/">Back to Issues List</Link>}
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default App;
