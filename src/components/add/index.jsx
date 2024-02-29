import { useContext, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";

function Add() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sur, setSur] = useState("");
  const navegate = useNavigate();
  const { setArry } = useContext(Arry);
  const add = () => {
    let arry = JSON.parse(localStorage.getItem("user")) || [];
    let obj = {
      id: arry?.length + 1,
      name,
      sur,
      email,
    };
    let user = [...arry, obj];
    localStorage.setItem("user", JSON.stringify(user));
    setArry(user);
    setEmail("");
    setName("");
    setSur("");
    navegate("/");
  };

  return (
    <>
      <div className="container">
        <div className="add">
          <div className="form">
            <label htmlFor="name">Firstname</label>
            <input
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Firstname"
              id="name"
              value={name}
            />
          </div>
          <div className="form">
            <label htmlFor="sur">Surname</label>
            <input
              onChange={(e) => setSur(e.target.value)}
              type="username"
              placeholder="Surname"
              id="sur"
              value={sur}
            />
          </div>
          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="last@.gmil.com"
              value={email}
            />
          </div>
        </div>
        <button
          className="save"
          onClick={add}
          disabled={!name || !email || !sur}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default Add;
