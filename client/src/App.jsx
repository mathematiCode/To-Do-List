import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
    console.log(toDos);
  }, []);

  const handleAddTodo = () => {
    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
    setNewTodo('');
  };

  const handleDeleteAll = () => {
    toDos.forEach(todo => {
      {
        console.log('deleting', todo.id);
        fetch(`http://localhost:8080/api/todos/${todo.id}`, {
          method: 'DELETE',
        });
      }
    });
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
  };

  const handleDeleteTodo = id => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {toDos.map(todo => (
        <div className="flex justify-between relative w-full" key={todo.id}>
          <span> {todo.title}</span>
          <button
            className="relative right-0"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Add a todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <button onClick={handleDeleteAll}>Delete All</button>
    </div>
  );
}

export default App;
