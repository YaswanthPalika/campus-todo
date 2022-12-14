const completeTodo = async (id, currentCompletionStatus) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !currentCompletionStatus,
      x: "completed",
    }),
  });
  return await response;
};

export default completeTodo;
