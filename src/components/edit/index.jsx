import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";

function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sur, setSur] = useState("");
  const navegate = useNavigate();
  const { setArry, id } = useContext(Arry);
  useEffect(() => {
    let arry = JSON.parse(localStorage.getItem("user")) || [];
    let id = JSON.parse(localStorage.getItem("id")) || null;
    arry?.map((el) => {
      if (el?.id === id) {
        return setEmail(el?.email), setName(el?.name), setSur(el?.sur);
      }
    });
  }, [id]);

  const editAdd = () => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let id = JSON.parse(localStorage.getItem("id")) || null;
    let updateobj = {
      id,
      name: name,
      email: email,
      sur: sur,
    };
    let personEdit = person.find((el) => el?.id === id);
    let newperson = person?.map((el) => {
      return el?.id === personEdit?.id ? updateobj : el;
    });
    localStorage.setItem("user", JSON.stringify(newperson));
    setArry(newperson);
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
          onClick={editAdd}
          disabled={!name || !email || !sur}
        >
          Update
        </button>
      </div>
    </>
  );
}

export default Edit;
