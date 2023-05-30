import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const List = ({ items, deleteItem, editItem, toggleItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title, completed } = item
        return (
          <article
            key={id}
            className={`todo-item ${completed ? "completed" : ""}`}
          >
            <div className="item-container">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleItem(id)} // Add toggleItem function to handle checkbox click
              />
              <p className="title">{title}</p>
            </div>

            <div className="btn-container">
              <button
                className="edit-btn"
                type="button"
                onClick={() => editItem(id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => deleteItem(id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </article>
        );
      })}
  </div>
  )
};

export default List;

// 
    //   <FontAwesomeIcon icon={faTrash} />
