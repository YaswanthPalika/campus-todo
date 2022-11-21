const favouriteTodo = async (id, currentFavouriteStatus) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favourite: !currentFavouriteStatus,
      x: "favourite",
    }),
  };
  console.log(options);
  const response = await fetch(`/api/todos/${id}`, options);
  return await response;
};

export default favouriteTodo;
