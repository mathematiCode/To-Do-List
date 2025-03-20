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
    setToDos([
      ...toDos,
      { id: toDos.length + 1, title: newTodo, completed: false },
    ]);
    setNewTodo('');
  };

  return (
    <div>
      {toDos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
      <input
        type="text"
        placeholder="Add a todo"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}

export default App;
