import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Header() {
  const navegate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="header">
            <h1 onClick={() => navegate("/")}>Contact App</h1>
            <button onClick={() => navegate("/add")}>Add</button>
          </div>
        </div>
        <ToastContainer />
      </header>
      <Outlet />
    </>
  );
}

export default Header;
