import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";
import { toast } from "react-toastify";

function Edit() {
  const [name, setName] = useState("");
  const [sur, setSur] = useState("");
  const [grup, setGrup] = useState("");
  const navegate = useNavigate();
  const [phone, setPhone] = useState("");

  const { setArry, id } = useContext(Arry);
  useEffect(() => {
    let arry = JSON.parse(localStorage.getItem("user")) || [];
    let id = JSON.parse(localStorage.getItem("id")) || null;
    arry?.map((el) => {
      if (el?.id === id) {
        return (
          setGrup(el?.grup),
          setName(el?.name),
          setSur(el?.sur),
          setPhone(el?.phone)
        );
      }
    });
  }, [id]);

  const editAdd = () => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let id = JSON.parse(localStorage.getItem("id")) || null;
    let updateobj = {
      id,
      name: name,
      grup: grup,
      sur: sur,
      phone: phone,
    };
    let personEdit = person.find((el) => el?.id === id);
    let newperson = person?.map((el) => {
      return el?.id === personEdit?.id ? updateobj : el;
    });
    localStorage.setItem("user", JSON.stringify(newperson));
    setArry(newperson);
    navegate("/");
    toast.success("Edit Contact");
  };
  const handleChange = (event) => {
    setGrup(event.target.value);
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
          onClick={editAdd}
          disabled={!name || !grup || grup === "all" || !sur || !phone}
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

export default Edit;
