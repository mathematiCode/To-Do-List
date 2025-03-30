import { X } from 'lucide-react';

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
    <div className="flex justify-start gap-4 relative w-full items-center">
      <input type="checkbox" className="checkbox" />
      <span className="text-text-light hover:text-hover-light dark:text-text-dark hover:dark:text-hover-dark">
        {item.title}
      </span>
      <button
        className="ml-auto text-text-light hover:text-hover-light dark:text-text-dark hover:dark:text-hover-dark"
        onClick={() => handleDeleteTodo(item.id)}
      >
        <X />
      </button>
    </div>
  );
}

export default Item;
