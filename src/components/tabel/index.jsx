import { useContext, useEffect, useState } from "react";
import Edit, { Delete } from "../../constants";
import "./index.scss";
import { Arry } from "../provider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../filter/index.scss";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
function Tabel() {
  const navegate = useNavigate();
  const [grup, setGrup] = useState("all");
  const { arry, setArry, setId } = useContext(Arry);
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
    if (window.confirm("Delete Contact")) {
      let person = JSON.parse(localStorage.getItem("user")) || [];
      let obj = person?.filter((el) => el?.id !== id);
      localStorage.setItem("user", JSON.stringify(obj));
      setArry(obj);
      toast.error("Delete Contact");
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

  // Like function
  const like = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: true };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  // Unlike function
  const unlike = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: false };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  // all
  const All = () => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    setData(person);
  };
  // Favorite
  const Favorite = () => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let newperson = person?.filter((el) => {
      if (el?.liked === true) {
        return el;
      }
    });
    setData(newperson);
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
              <option value="all">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="btns">
            <button onClick={All}>All</button>
            <button onClick={Favorite}>Favorite</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tabel">
          <div className="tr">
            <p>#</p>
            <p>First</p>
            <p>Last</p>
            <p>Gender</p>
            <p>Phone</p>
            <p>Favorite</p>
            <p>Action</p>
          </div>
          {data && data
            ? data?.map((el, index) => (
                <div className="tr1" key={index}>
                  <p>{el?.id}</p>
                  <p>{el?.name}</p>
                  <p>{el?.sur}</p>
                  <p> {el?.grup} </p>
                  <p>{el?.phone} </p>
                  <p
                    className="like"
                    onClick={() => (el.liked ? unlike(el.id) : like(el.id))}
                  >
                    {el.liked ? <FcLike /> : <FcLikePlaceholder />}
                  </p>

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
