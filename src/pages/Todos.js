import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";
import FilterTodos from "../components/todos/Filter";
import CreateTodos from "../components/todos/Create";
import UpdateTodo from "../components/todos/Update";
import DeleteTodo from "../components/todos/Delete";

const Todos = () => {
    // const todoContext = useContext(TodoContext)
    // const {state, dispatch} = useContext(TodoContext)
    // const { todos, dispatch } = useContext(TodoContext)
    const { todos, getTodos, error } = useContext(TodoContext)
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/todos")
    //     .then(res => res.json())
    //     .then(data => {
    //         todoContext.dispatch({type: 'SET_TODOS', payload: data})
    //     })
    // }, [])

    // useEffect(() => {

    //     axios.get("https://jsonplaceholder.typicode.com/todos")
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err.message))
    // }, [])

    /*useEffect(async() => {

        function fetchData() {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
                console.log(res.data)
            }catch(err) {
                console.log(err.message)
            }
        }
        fetchData();
     }, [])*/

     /*useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
                console.log(res.data)
                dispatch({type:"SET_TODOS", payload: res.data})
                setLoading(false)
            }catch(err) {
                console.log(err.message)
            }
        }
        fetchData();
     }, [])*/


    useEffect(() => {

        const fetchData = async () => {
            await getTodos()
            setLoading(false);
        }
        fetchData()
    }, [getTodos])    //getTodos را داخل usecallback قرار می دهیم تا تابع داخل loop نیفتد.



    return (
        // <h1>Todo Page - {todoContext}</h1>
        // <h1>Todo Page</h1>
        <div className="container mt-5">
            <div className="row g-3">
                <CreateTodos />
                <hr />
                <FilterTodos />
                {error && <div>{error}</div>}
                {loading && <div className="col-md-12 text-center"><div className="spinner-border mt-5"></div></div>}
                {todos && todos.map(todo => (
                    // <h1 key={todo.id}>{todo.title}</h1>
                    <div className="col-md-4" key={todo.id}>
                        <div className={"card " + (todo.completed && "bg-light")}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                {/* <div>{todo.title}</div> */}
                                <div>{todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}</div>
                                <div className="d-flex align-items-center">
                                    {/* {todo.completed ?
                                        <i className="bi bi-check-all fs-4"></i>
                                        :
                                        <i className="bi bi-check fs-4"></i>
                                    } */}
                                    <UpdateTodo todo={todo} />

                                    {/* <i className="bi bi-trash-fill fs-6"></i> */}
                                    <DeleteTodo todoId={todo.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Todos;