import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  // Load from LocalStorage on mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      {/* Responsive Container: Full width on mobile, 1/2 on large screens */}
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl border-white md:border-4 p-5 min-h-[80vh] w-full lg:w-1/2">
        
        <div className="addTodo flex flex-col my-5 gap-3">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              onChange={handleChange} 
              value={todo} 
              className='w-full rounded-full px-5 py-1 text-black' 
            />
            <button 
              onClick={handleAdd} 
              disabled={todo.length <= 1} 
              className="bg-violet-500 hover:bg-violet-600 disabled:bg-violet-300 p-3 py-1 px-4 text-sm rounded-xl font-bold text-white"
            >
              
              ADD
            </button>
          </div>
        </div>

        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="my-10 text-center">No Todos to display</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className="todo flex w-full justify-between my-3 items-center">
                <div className='flex gap-5 items-center'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    checked={item.isCompleted} 
                    className='cursor-pointer'
                  />
                  <div className={item.isCompleted ? "line-through text-gray-400" : ""}>
                    {item.todo}
                  </div>
                </div>
                
                {/* Responsive Buttons: Shrink and stack if needed */}
                <div className="buttons flex h-full">
                  <button 
                    onClick={() => handleEdit(item.id)} 
                    className="bg-violet-500 hover:bg-violet-600 p-2 py-1 text-sm rounded-md mx-1 font-bold text-white"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="bg-violet-500 hover:bg-violet-600 p-2 py-1 text-sm rounded-md mx-1 font-bold text-white"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App