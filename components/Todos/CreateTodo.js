import React from "react";

const CreateTodo = () => {
  const [title, setTitle] = React.useState("");
  const [createTodo, setCreateTodo] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const todo = await response.json();
    setTitle("");
    setCreateTodo(false);
  };

  return (
    <div>
      {createTodo ? (
        <CreateIconTrue
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          setCreateTodo={setCreateTodo}
        />
      ) : (
        <CreateIconFalse setCreateTodo={setCreateTodo} />
      )}
    </div>
  );
};

//creating todo icon
const CreateIconTrue = ({ handleSubmit, title, setTitle, setCreateTodo }) => {
  return (
    <div className="create-todo-container">
      <form onSubmit={handleSubmit}>
        <div>
          <img className="short-icon" alt="short-icon" src="short.png" />
          <input
            className="create-input-bar"
            type="text"
            placeholder="Enter Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <hr className="create-input-line" />
        <div className="create-input-line2">
          <div>
            <input type="date" />
          </div>
          <div className="create-input-buttons">
            <button
              onClick={() => {
                setCreateTodo(false);
              }}
              className="transparentButton"
              type="submit"
            >
              <img src="cross.png" />
            </button>
            <button type="submit" className="transparentButton" type="submit">
              <img src="tick.png" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// initial todo icon
const CreateIconFalse = ({ setCreateTodo }) => {
  return (
    <div className="createTodoBox">
      <button
        onClick={() => {
          setCreateTodo(true);
        }}
        className="transparentButton"
      >
        <img className="plusButton" src="plus.png" alt="plus button" />
      </button>
      <p className="paraCreateNewItem">Create New Item</p>
    </div>
  );
};

export default CreateTodo;
