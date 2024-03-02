import { useContext, useEffect, useState } from "react";
import Edit, { Delete } from "../../constants";
import "./index.scss";
import { Arry } from "../provider";
import { useNavigate } from "react-router-dom";
import "../filter/index.scss";
function Tabel() {
  const navegate = useNavigate();
  const [grup, setGrup] = useState("all");
  const { arry, setArry, id, setId } = useContext(Arry);
  const [data, setData] = useState();
  useEffect(() => {
    let arry1 = JSON.parse(localStorage.getItem("user")) || [];
    setData(arry1);
  }, [arry]);

  const handleChange = (event) => {
    setGrup(event.target.value);
    let value = event.target.value;
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let newperson = person?.filter((el) => {
      return value === "all" ? el : el?.grup === value;
    });
    setData(newperson);
  };

  const deleteAdd = (id) => {
    if (window.confirm("Delete Student")) {
      let person = JSON.parse(localStorage.getItem("user")) || [];
      let obj = person?.filter((el) => el?.id !== id);
      localStorage.setItem("user", JSON.stringify(obj));
      setArry(obj);
    }
  };

  const edit = (id) => {
    navegate("/edit");
    setId(id);
    localStorage.setItem("id", JSON.stringify(id));
  };

  const search = (value) => {
    let v = value.toLowerCase();
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let search = person?.filter((el) => {
      return (
        el?.name?.toLowerCase().includes(v) ||
        el?.sur?.toLowerCase().includes(v) ||
        el?.grup?.toLowerCase().includes(v)
      );
    });
    setData(search);
  };

  return (
    <>
      <div className="container">
        <div className="filter">
          <div className="input">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => search(e.target.value)}
            />
          </div>
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
      </div>
      <div className="container">
        <div className="tabel">
          <div className="tr">
            <p>#</p>
            <p>First</p>
            <p>Last</p>
            <p>Group</p>
            <p>Does work?</p>
            <p>Action</p>
          </div>
          {data && data
            ? data?.map((el, index) => (
                <div className="tr1" key={index}>
                  <p>{el?.id}</p>
                  <p>{el?.name}</p>
                  <p>{el?.sur}</p>
                  <p> {el?.grup} </p>
                  <p>{el?.isChecked ? "☑️" : "❌"} </p>
                  <p>
                    <button className="edit" onClick={() => edit(el?.id)}>
                      <Edit />
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteAdd(el?.id)}
                    >
                      <Delete />
                    </button>
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default Tabel;
