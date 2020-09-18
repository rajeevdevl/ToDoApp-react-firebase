import React, { useState, useEffect } from 'react';
import ToDo from './components/ToDo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css'
import db from './firebase';
import firebase from 'firebase';




function App() {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");



    // when the App loads, we need to listen the database and fetch new todos as they get added/removed
    //****** useEffect(function,dependencies(whatever we put in the place of dep. the app will load as many times it changes)) *****/

    useEffect(() => {
        db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().task})))
        })
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        // setTodos([...todos, input])
        db.collection('todos').add({
            task: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }


    return (
        <div className="App">
            <h1>ToDo's</h1>

            <form>
                <FormControl>
                    <InputLabel >Things to do</InputLabel>
                    <Input value={input} onChange={(event) => setInput(event.target.value)} />
                </FormControl>

                <Button variant="contained" color="primary" onClick={addTodo} disabled={!input} type="submit">Add todo</Button>

                {/* <div className="select">
                    <select name="todos" className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div> */}
            </form>

            <ul>
                {todos.map((data) => (
                    <ToDo todoItem={data} key={data.id}/>
                ))}
            </ul>
        </div>
    )
}

export default App;