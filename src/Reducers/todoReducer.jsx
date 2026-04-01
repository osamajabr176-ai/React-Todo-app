import { v4 as uuidv4 } from "uuid";


export default function reducer(currentTodos, action) {

switch (action.type) { 

    case "ADD_TODO": {
        if ( action.payload.titleTodo.trim() !== "") {
            const newTodo = {
                id: uuidv4(),
                text: action.payload.titleTodo,
                desc: "وصف المهمة الجديدة",
                isFinished: false,
            };
            return [...currentTodos, newTodo];
        }
        return currentTodos;
    }

    case "DELETE_TODO":
        return currentTodos.filter(t => t.id !== action.payload);

    case "UPDATE_TODO":
    return currentTodos.map(t =>
    t.id === action.payload.id ? action.payload : t
    );

    case "TOGGLE_TODO":
    return currentTodos.map(t =>
    t.id === action.payload
    ? { ...t, isFinished: !t.isFinished }
    : t
    );
    
    default:
        throw new Error("Unknown action type: " + action.type);
}
}