
import './App.css'
import TodoList from '../src/Component/TodoList';
import { ToastProvider } from './contexts/ToastContext';
import TodosProvider from './contexts/todosContext';


function App() {


  return (
    <>
      
    <div style={{background:"#191b1f" ,fontFamily:"A"}}>
      <TodosProvider>
      <ToastProvider>
        <TodoList />
      </ToastProvider>
      </TodosProvider>
    </div>
    </>
  )
}

export default App
