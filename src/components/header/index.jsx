import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";

function Header() {
  const navegate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="header">
            <h1 onClick={() => navegate("/")}>Xodimlar</h1>
            <button onClick={() => navegate("/add")}>Add</button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
