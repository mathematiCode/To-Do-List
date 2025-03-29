function Item({ item, setToDos }) {
  const handleDeleteTodo = id => {
    console.log('deleting', id);
    try {
      fetch(`https://to-do-list-backend-8utj.onrender.com/api/todos/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => setToDos(data.toDos));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="flex justify-between relative w-full">
      <input type="checkbox" className="rounded-full w-3" />
      <span className="">{item.title}</span>
      <button
        className="relative right-0"
        onClick={() => handleDeleteTodo(item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Item;
