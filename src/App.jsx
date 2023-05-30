import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "", });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleItem = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // show alert
      showAlert(true, "please enter a todo", "danger")
    }
    else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {...item, title:name}
          }
          return item
        })
      )
      setName('');
      setEditID(null);
      setIsEditing(false)
      showAlert(true, "todo edited", "success")
    }
    else {
      //show alert
      showAlert(true, "todo added" ,"success")
      const newItem = {id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName("")
    };  
  }

   

  const showAlert = (show=false, msg="", type= "") => {
    setAlert({ show, msg, type })
  }

  const clearList = () => {
    showAlert(true, "list emptied", "danger")
    setList([])
  }

  const deleteItem = (id) => {
    showAlert(true, "todo deleted", "danger")
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id == id);
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <div>
        {/* <h3 className="centered-text">Do-eazzy</h3> */}
        <h2>What are you doing today?</h2>
        <p className="centered-text">{currentDate}</p>
      </div>
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Add a todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List
            items={list}
            deleteItem={deleteItem}
            editItem={editItem}
            toggleItem={toggleItem}
          />
          <button className="clear-btn" onClick={clearList}>
            Clear List
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
