import { useContext, useState } from "react"
import TodoContext from "../../context/TodoContext"

const CreateTodos = () => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false);
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title) {
            // console.log(title)
            setLoading(true);
            await addTodo(title);
            setLoading(false)
        }
    }
    return (
        <>
            <h4>Create Todo:</h4>
            <form onSubmit={(e) => handleSubmit(e)} className="row mt-3">
                <div className="col-md-6">
                    <input onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" placeholder="Todo title..." />
                    <div className="form-text text-danger">
                        {/* Title is reqired */}
                        {title ? '' : 'Title is reqired'}
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn btn-dark" type="submit">
                        create
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>

    )
}

export default CreateTodos;