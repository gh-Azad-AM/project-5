import { useCallback, useReducer } from "react";
import TodoContext from "./TodoContext";
import todoReduser from "./todoReduser";
import axios from "axios";
// import { Toast } from "bootstrap";
import Swal from "sweetalert2";


const initialState = {
    todos: [],
    error: null
}

const TodoProvider = ({children}) => {

    const [state, dispatch] = useReducer(todoReduser, initialState);

    // async function fetchData() {
    const getTodos = useCallback (async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
            // console.log(res.data)
            dispatch({ type: "SET_TODOS", payload: res.data })
            dispatch({ type: "SET_ERROR", payload: null })
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "SET_ERROR", payload: err.message })
            dispatch({ type: "SET_TODOS", payload: [] })
        }
    }, []);

    const filterTodos = async (count) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`);
            // console.log(res.data)
            dispatch({ type: "FILTER_TODOS", payload: res.data })
            dispatch({ type: "SET_ERROR", payload: null })
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "SET_ERROR", payload: err.message })
            dispatch({ type: "FILTER_TODOS", payload: [] })
        }
    }

    const addTodo = async (title) => {
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos" ,{
                title: title,
                completed: false
            });
            // console.log(res.data);
            // console.log(res.data)
            dispatch({ type: "ADD_TODO", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
            Swal.fire({
                position: 'top',
                icon: "success",
                title: "Task added",
                showConfirmButton: false,
                timerProgressBar: true,
                Toast: true,
                timer: 3000
              });
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "SET_ERROR", payload: err.message })
            dispatch({ type: "ADD_TODO", payload: [] })
        }
    }

    const updateTodo = async (todo) => {
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                title: todo.title,
                completed: !todo.completed
            });
            // console.log(res.data)
            dispatch({ type: "UPDATE_TODO", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
            Swal.fire({
                position: 'top',
                icon: "success",
                title: "Task updated",
                showConfirmButton: false,
                timerProgressBar: true,
                Toast: true,
                timer: 3000
              });
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "SET_ERROR", payload: err.message })
            dispatch({ type: "ADD_TODO", payload: [] })
        }
    }

    const removeTodo = async (todoId) => {
        try {
            // const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            // console.log("delete");
            
            dispatch({ type: "REMOVE_TODO", payload: todoId });
            dispatch({ type: "SET_ERROR", payload: null });
            Swal.fire({
                position: 'top',
                icon: "warning",
                title: "Task deleted",
                showConfirmButton: false,
                timerProgressBar: true,
                Toast: true,
                timer: 3000
              });
        } catch (err) {
            console.log(err.message)
            dispatch({ type: "SET_ERROR", payload: err.message })
            dispatch({ type: "ADD_TODO", payload: [] })
        }
    }
    
    return(
        // <TodoContext.Provider value={"1403"}>
        // <TodoContext.Provider value={{...state, dispatch}}>
        <TodoContext.Provider value={{...state, getTodos, filterTodos, addTodo, updateTodo, removeTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;