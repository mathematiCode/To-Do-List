function Item({ item, setToDos }) {
  const handleDeleteTodo = id => {
    console.log('deleting', id);
    try {
      fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => setToDos(data.toDos));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="flex justify-between relative w-full bg-peach">
      <span className="text-peach">{item.title}</span>
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
