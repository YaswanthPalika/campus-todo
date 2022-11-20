import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import styles from "../../styles/Todos.module.css";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [createTodo, setCreateTodo] = React.useState(false);

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

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
        <p className={styles.paraSort}>Sort By</p>
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
            }}
          >
            {/**content  */}
            <div className={styles.todoList}>
              <button
                className={`${styles["checkBoxContainer"]} ${styles["transparentButton"]}`}
              >
                <img className={styles.checkBox} src="check.png" />
                <img className={styles.checkBox2} src="check2.png" />
              </button>
              <p className={styles.paraTodo}>{todo.title}</p>
            </div>
            {/**todo icons */}
            <div className={styles.iconsContainer}>
              <button
                className={`${styles["duplicateImageContainer"]} ${styles["transparentButton"]}`}
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
              >
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
              </button>
              <button
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
        <CreateTodo />
      </ul>
    </div>
  );
}
