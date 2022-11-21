import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import styles from "../../styles/Todos.module.css";
import favouriteTodo from "../../utils/todos/starTodo";
import duplicateTodo from "../../utils/todos/duplicateTodo";
import moment from "moment";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [createTodo, setCreateTodo] = React.useState(false);
  const [editItem, setEditItem] = React.useState([]);

  React.useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodos(todos);
        console.log(todos);
      })
      .catch((err) => {
        console.log(err);
        setTodos([]);
      });
  }, []);

  const checkOverDue = (dueDate) => {
    const currentDate = new Date();
    if (dueDate == null) {
      return false;
    } else {
      const x = moment().format();
      if (x > dueDate) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleDuplicate = async (title) => {
    const response = await duplicateTodo(title);
    const todo = await response.json();
    setTodos([...todos, todo]);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleFavourite = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await favouriteTodo(id, todo.favourite);
    const updatedTodo = await response.json();
    console.log(updatedTodo);
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div className={styles.todo}>
      {/*title bar*/}
      <div className={styles.title}>
        <img src="Logo.png" alt="title-icon" className={styles.titleIcon} />
        <h1 className={styles.titleHeading}>Todo List</h1>
      </div>
      {/* Search bar */}
      <div className={styles.actionBar}>
        <div className={styles.searchBar}>
          <img className={styles.searchIcon} src="search.png" />
          <input
            className={styles.searchInput}
            placeholder="Search by Title"
            type="text"
          />
        </div>
        <div className={styles.sortContainer}>
          <p className={styles.paraSort}>Sort By</p>
        </div>
        <p className={styles.paraActivity}>Activity log</p>
      </div>
      {/*todo list menu */}

      <ul className={styles.todoListBox}>
        {/*to list */}
        {todos.map((todo) => (
          <li
            className={styles.todoListContainer}
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              backgroundColor: checkOverDue(todo.dueDate) ? "#FFDFDF" : "white",
            }}
          >
            {/**content  */}
            <div className={styles.todoList}>
              <button
                onClick={() => {
                  handleComplete(todo.id);
                }}
                className={`${styles["checkBoxContainer"]} ${styles["transparentButton"]}`}
              >
                {todo.completed ? (
                  <img
                    style={{ display: "block" }}
                    className={styles.checkBox2}
                    src="check2.png"
                  />
                ) : (
                  <>
                    <img className={styles.checkBox} src="check.png" />
                    <img className={styles.checkBox2} src="check2.png" />
                  </>
                )}
              </button>
              <p
                onClick={async () => {
                  await setEditItem((x) => [...x, todo.id]);
                }}
                className={styles.paraTodo}
                style={{
                  fontWeight: todo.favourite ? "bold" : "normal",
                }}
              >
                {todo.title}
              </p>
            </div>
            <div className={styles.todoItemEmptyDiv}></div>
            {/**todo icons */}
            <div className={styles.iconsContainer}>
              <button
                className={`${styles["duplicateImageContainer"]} ${styles["transparentButton"]}`}
                onClick={() => {
                  handleDuplicate(todo.title);
                }}
              >
                <img
                  className={styles.duplicateImage}
                  src="duplicate.png"
                  alt="duplicate-icon"
                />
                <img
                  className={styles.duplicateImage2}
                  src="duplicate2.png"
                  alt="duplicate-icon"
                />
              </button>
              <button
                className={`${styles["starImageContainer"]} ${styles["transparentButton"]}`}
                onClick={() => {
                  handleFavourite(todo.id);
                }}
              >
                {todo.favourite ? (
                  <img
                    style={{ display: "block" }}
                    className={styles.starImage2}
                    src="star2.png"
                    alt="star-icon"
                  />
                ) : (
                  <>
                    <img
                      className={styles.starImage}
                      src="star.png"
                      alt="star-icon"
                    />
                    <img
                      className={styles.starImage2}
                      src="star2.png"
                      alt="star-icon"
                    />
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
                className={`${styles["deleteImageContainer"]} ${styles["transparentButton"]}`}
              >
                <img
                  className={styles.deleteImage}
                  src="delete.png"
                  alt="delete-icon"
                />
                <img
                  className={styles.deleteImage2}
                  src="delete2.png"
                  alt="delete-icon"
                />
              </button>
            </div>
          </li>
        ))}
        {/* create new item */}
        <CreateTodo setTodos={setTodos} todos={todos} />
      </ul>
    </div>
  );
}
