import { createContext,useContext,useReducer } from "react";
import todoReducer from "../Reducers/todoReducer";

const TodosContext = createContext([]);
const TodosDispatchContext = createContext(null);

export const useTodos = () => {
    return useContext(TodosContext);
}
export const useTodosDispatch = () => {
    return useContext(TodosDispatchContext);
}

export default function TodosProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, [], () => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    return (
        <TodosContext.Provider value={{todos}}>
            <TodosDispatchContext.Provider value={dispatch}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    )
}
