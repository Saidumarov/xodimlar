import { useContext, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";

function Add() {
  const [name, setName] = useState("");
  const [grup, setGrup] = useState("");
  const [sur, setSur] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeChek = () => {
    setIsChecked(!isChecked);
  };

  const navegate = useNavigate();
  const handleChange = (event) => {
    setGrup(event.target.value);
  };
  const { arry, setArry } = useContext(Arry);

  const add = () => {
    let arry = JSON.parse(localStorage.getItem("user")) || [];
    let obj = {
      id: arry?.length + 1,
      name,
      sur,
      grup,
      isChecked,
    };
    let user = [...arry, obj];
    localStorage.setItem("user", JSON.stringify(user));
    setArry(user);
    setGrup("");
    setName("");
    setSur("");
    navegate("/");
    isChecked(false);
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
            <label htmlFor="sur">Lastname</label>
            <input
              onChange={(e) => setSur(e.target.value)}
              type="username"
              placeholder="Lastname"
              id="sur"
              value={sur}
            />
          </div>
          <div className="form_one">
            <div className="form">
              <label htmlFor="email">Group</label>
              <div className="filter_item">
                <select value={grup} onChange={handleChange}>
                  <option value="all">All</option>
                  <option value="react32">React 32</option>
                  <option value="react42">React 42</option>
                  <option value="react52">React 52</option>
                  <option value="react45">React 45</option>
                </select>
              </div>
            </div>
            <div className="form1">
              <p> Does work?</p>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChangeChek}
              />
            </div>
          </div>
        </div>
        <button
          className="save"
          onClick={add}
          disabled={!name || !grup || !sur}
        >
          Save
        </button>
        <button className="close" onClick={() => navegate("/")}>
          Close
        </button>
      </div>
    </>
  );
}

export default Add;
