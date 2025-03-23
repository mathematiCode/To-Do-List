import { useState, useEffect } from 'react';
import { Switch } from 'antd';
import Item from './components/item';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
    console.log(toDos);
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }
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
    if (toDos.length === 0) {
      return;
    }
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Switch
        className="absolute top-0 right-0"
        value={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <div className="flex flex-col gap-4 p-4 w-1/5">
        {toDos?.map(todo => (
          <Item key={todo.id} item={todo} setToDos={setToDos} />
        ))}
        <div>
          <input
            type="text"
            placeholder="Add a todo"
            value={newTodo}
            className="flex-1"
            onChange={e => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo} className="relative right-0">
            Add
          </button>
        </div>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
    </div>
  );
}

export default App;
