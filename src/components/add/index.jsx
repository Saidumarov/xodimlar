import { useContext, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";
import { toast } from "react-toastify";
function Add() {
  const [name, setName] = useState("");
  const [grup, setGrup] = useState("");
  const [sur, setSur] = useState("");
  const [phone, setPhone] = useState("");

  const navegate = useNavigate();
  const handleChange = (event) => {
    setGrup(event.target.value);
  };
  const { setArry } = useContext(Arry);

  const add = () => {
    let arry = JSON.parse(localStorage.getItem("user")) || [];
    let obj = {
      id: arry?.length + 1,
      name,
      sur,
      grup,
      phone,
    };
    let user = [...arry, obj];
    localStorage.setItem("user", JSON.stringify(user));
    setArry(user);
    navegate("/");
    toast.success("Add Contact");
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
          <div className="form">
            <label htmlFor="phone">Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+998-88-765-07-14"
              id="phone"
              value={phone}
            />
          </div>
          <div className="form_one">
            <div className="form">
              <label htmlFor="email">Group</label>
              <div className="filter_item">
                <select value={grup} onChange={handleChange}>
                  <option value="all">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          className="save"
          onClick={add}
          disabled={!name || !grup || !sur || !phone}
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
