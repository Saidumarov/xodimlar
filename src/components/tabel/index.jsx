import { useContext, useEffect, useState } from "react";
import Edit, { Delete } from "../../constants";
import "./index.scss";
import { Arry } from "../provider";
import { useNavigate } from "react-router-dom";

function Tabel() {
  const navegate = useNavigate();

  const { arry, setArry, id, setId } = useContext(Arry);
  const [data, setData] = useState();
  useEffect(() => {
    let arry1 = JSON.parse(localStorage.getItem("user")) || [];
    setData(arry1);
  }, [arry]);

  const deleteAdd = (id) => {
    if (window.confirm("Delete employee")) {
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

  return (
    <>
      <div className="container">
        <div className="tabel">
          <div className="tr">
            <p>#</p>
            <p>Firstname</p>
            <p>Surname</p>
            <p>Email</p>
            <p>Action</p>
          </div>
          {data && data
            ? data?.map((el, index) => (
                <div className="tr1" key={index}>
                  <p>{el?.id}</p>
                  <p>{el?.name}</p>
                  <p>{el?.sur}</p>
                  <p> {el?.email} </p>
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
