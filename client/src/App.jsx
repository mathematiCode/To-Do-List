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

  const handleDeleteAll = async () => {
    if (toDos.length === 0) {
      return;
    }
    await toDos.forEach(todo => {
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
    console.log(toDos);
  };

  return (
    <>
      <div className="top-0 w-full h-fit flex flex-col items-end">
        <img
          src={
            darkMode
              ? './images/bg-desktop-dark.jpg'
              : './images/bg-desktop-light.jpg'
          }
          className="w-full"
        />
        <Switch
          value={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-2 z-1 -translate-y-36"
        />
      </div>
      <div className="w-full h-full flex relative justify-center items-center">
        <div className="flex flex-col gap-4 p-4 max-w-md">
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
    </>
  );
}

export default App;
