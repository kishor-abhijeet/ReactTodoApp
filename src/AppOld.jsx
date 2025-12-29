import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';


function App() {
 const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }

  }, [])
  

  const saveToLS =(params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleEdit =(id)=>{
    let t = todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete =(id)=>{
    console.log(`The id is ${id}`)
    // let index = todos.findIndex(item=>{
    //   return item.id === id;
    // })
    // console.log(index)
    let newTodos = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodos)
  }
  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(),todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
  }
  const handleChange =(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

  }
  
  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl  border-4 border-white p-5 min-h-[80vh] w-1/2">
        <div className="addTodo flex-col my-5 gap-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input type="text" onChange={handleChange} checked={todo} className='w-full'  />
          <button onClick={handleAdd} disabled={todo.length<=1} className="bg-violet-500 hover:bg-slate-400 p-3 py-1 px-4 text-sm rounded-xl mx-6 font-bold text-white">ADD</button>
        </div>
        <h2 className='text-lg font-bold '>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="my-10"> No Todos to display</div>}
          {todos.map(item=>{

         
        
        return <div key={item.id} className="todo flex w-1/2  justify-between my-3">
          <div className='flex gap-5'>
          <input name = {item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}  id="" className='mx-4'/>

          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>

          </div>
          <div className="buttons flex h-full">
            <button onClick={()=>handleEdit(item.id)} className="bg-violet-500 hover:bg-slate-400 p-3 py-1 px-4 text-sm rounded-md mx-1 font-bold text-white">Edit</button>
            <button onClick={()=>handleDelete(item.id)} className="bg-violet-500 hover:bg-slate-400 p-3 py-1 px-4 text-sm rounded-md mx-1 font-bold text-white">Delete</button>
          </div>
        </div>
         })}
         </div>
      </div>

    </>
  )
}

export default App
