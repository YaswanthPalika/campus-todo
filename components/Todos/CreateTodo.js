import React from "react";

const CreateTodo = ({ setTodos, todos }) => {
  const [title, setTitle] = React.useState("");
  const [isStarred, setIsStarred] = React.useState(false);
  const [createTodo, setCreateTodo] = React.useState(false);
  const [dueDate, setDueDate] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dueDate);
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate,
      }),
    });
    const todo = await response.json();
    setTitle("");
    setCreateTodo(false);
    setTodos([...todos, todo]);
  };

  return (
    <div>
      {createTodo ? (
        <CreateIconTrue
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          setCreateTodo={setCreateTodo}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      ) : (
        <CreateIconFalse setCreateTodo={setCreateTodo} />
      )}
    </div>
  );
};

//creating todo icon
const CreateIconTrue = ({
  handleSubmit,
  title,
  setTitle,
  setCreateTodo,
  dueDate,
  setDueDate,
}) => {
  let newDate = new Date();
  const [dateButton, setDateButton] = React.useState(false);
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let date = newDate.getDate();
  let currentMonth = month[newDate.getMonth()];
  return (
    <div className="create-todo-container">
      {/*first line*/}
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
        {/*second line*/}
        <div className="create-input-line2">
          <div className="create-input-date">
            {/* date input */}
            {dateButton ? (
              <div className="due-date-container">
                <input
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDueDate(e.target.value);
                  }}
                  className="due-date"
                  type="datetime-local"
                />
              </div>
            ) : (
              <div className="calender-due-container">
                <div className="create-input-current-calender">
                  <p className="current-month-container">{currentMonth}</p>
                  <p className="current-date-container">{date}</p>
                </div>
                <button
                  className="transparentButton dueButton"
                  onClick={() => {
                    setDateButton(true);
                  }}
                >
                  Enter Due Date
                </button>
              </div>
            )}
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
