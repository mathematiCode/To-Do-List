import { X } from 'lucide-react';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

function Item({ item, setToDos }) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered, 'is hovered');

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
      <Checkbox
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        checkedIcon={<img src="/images/checked-gradient.svg" />}
        icon={
          <img
            src={
              isHovered
                ? '/images/unchecked-gradient.svg'
                : '/images/unchecked-gray.svg'
            }
          />
        }
      />
      <div className="image"> </div>
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
