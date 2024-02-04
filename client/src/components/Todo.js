// import { useEffect, useState } from 'react';
// const api_base = 'http://localhost:5500';

// function Todo() {
// 	const [todos, setTodos] = useState([]);
// 	const [popupActive, setPopupActive] = useState(false);
// 	const [newTodo, setNewTodo] = useState("");

// 	useEffect(() => {
// 		GetTodos();
// 	}, []);

// 	// const GetTodos = async() => {
// 	// 	fetch(api_base + '/todos')
// 	// 		.then(res => res.json())
// 	// 		.then(data => setTodos(data))
// 	// 		.catch((err) => console.error("Error: ", err));
        
//     //     };

//     const GetTodos = async () => {
//         try {
//           const response = await fetch(api_base + '/todo', {
//             headers: {
//               'Authorization': localStorage.getItem('userId')
//             }
//           });
//           if (!response.ok) {
//             throw new Error('Failed to fetch todos');
//           }
//           const data = await response.json();
//           setTodos(data.todos);
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       };
      
	

// 	const completeTodo = async id => {
// 		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

// 		setTodos(todos => todos.map(todo => {
// 			if (todo._id === data._id) {
// 				todo.complete = data.complete;
// 			}

// 			return todo;
// 		}));
		
// 	}

// 	const addTodo = async () => {
// 		const data = await fetch(api_base + "/todo/new", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json" 
// 			},
// 			body: JSON.stringify({
// 				text: newTodo,
//                 user:localStorage.getItem('userId'),
// 			})
// 		}).then(res => res.json());

// 		setTodos([...todos, data]);

// 		setPopupActive(false);
// 		setNewTodo("");
// 	}

// 	const deleteTodo = async id => {
// 		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

// 		setTodos(todos => todos.filter(todo => todo._id !== data._id));
// 	}

// 	return (
// 		<div className="App">
// 			<h1>Welcome !!</h1>
// 			<h4>Your tasks</h4>

// 			<div className="todos">
// 				{todos.length > 0 ? todos.map(todo => (
// 					<div className={
// 						"todo" + (todo.complete ? " is-complete" : "")
// 					} key={todo._id} onClick={() => completeTodo(todo._id)}>
// 						<div className="checkbox"></div>

// 						<div className="text">{todo.text}</div>

// 						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
// 					</div>
// 				)) : (
// 					<p>You currently have no tasks</p>
// 				)}
// 			</div>

// 			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

// 			{popupActive ? (
// 				<div className="popup">
// 					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
// 					<div className="content">
// 						<h3>Add Task</h3>
// 						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
// 						<div className="button" onClick={addTodo}>Create Task</div>
// 					</div>
// 				</div>
// 			) : ''}
// 		</div>
// 	);
// }

// export default Todo;


import { useEffect, useState } from 'react';

const api_base = 'https://auth-todo-backend.onrender.com';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            const response = await fetch(api_base + '/todo', {
                headers: {
                    'Authorization': localStorage.getItem('userId')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json();
            setTodos(data.todos);
        } catch (error) {
            console.error('Error:', error);
            // You might want to inform the user about the error here
        }
    };

    const completeTodo = async id => {
        try {
            const response = await fetch(api_base + '/todo/complete/' + id);
            if (!response.ok) {
                throw new Error('Failed to complete todo');
            }
            const data = await response.json();
            setTodos(prevTodos => prevTodos.map(todo => {
                if (todo._id === data._id) {
                    return data;
                }
                return todo;
            }));
        } catch (error) {
            console.error('Error:', error);
            // You might want to inform the user about the error here
        }
    };

    const addTodo = async () => {
        try {
            const response = await fetch(api_base + "/todo/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: newTodo,
                    user: localStorage.getItem('userId'),
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add new todo');
            }
            const data = await response.json();
            setTodos(prevTodos => [...prevTodos, data]);
            setPopupActive(false);
            setNewTodo("");
        } catch (error) {
            console.error('Error:', error);
            // You might want to inform the user about the error here
        }
    };

    const deleteTodo = async id => {
        try {
            await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" });
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error:', error);
            // You might want to inform the user about the error here
        }
    };

    return (
        <div className="tood_App">
            <h1 className='todo_h1'>Welcome !!</h1>
            <h4 className='todo_h4'>Your tasks</h4>

            <div className="todos">
                {todos.length > 0 ? todos.map(todo => (
                    <div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
                        <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>
                )) : (
                    <p className='todo_p'>You currently have no tasks</p>
                )}
            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive && (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
                    <div className="content">
                        <h3 className='todo_h3'>Add Task</h3>
                        <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                        <div className="button" onClick={addTodo}>Create Task</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todo;
