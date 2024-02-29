import Header from "./components/header";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Tabel from "./components/tabel";
import Provider from "./components/provider";
import Add from "./components/add";
import Edit from "./components/edit";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Tabel />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit" element={<Edit />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
