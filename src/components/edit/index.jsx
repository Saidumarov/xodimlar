import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { Arry } from "../provider";

function Edit() {
  const [name, setName] = useState("");
  const [sur, setSur] = useState("");
  const [grup, setGrup] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navegate = useNavigate();

  const handleChangeChek = () => {
    setIsChecked(!isChecked);
  };

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
          setIsChecked(el?.isChecked)
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
      isChecked: isChecked,
      sur: sur,
    };
    let personEdit = person.find((el) => el?.id === id);
    let newperson = person?.map((el) => {
      return el?.id === personEdit?.id ? updateobj : el;
    });
    localStorage.setItem("user", JSON.stringify(newperson));
    setArry(newperson);
    setName("");
    setGrup("");
    setSur("");
    setIsChecked(false);
    navegate("/");
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
          onClick={editAdd}
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

export default Edit;
