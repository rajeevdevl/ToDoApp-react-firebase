import React, { useState } from 'react'
import { List, ListItem, ListItemText, Modal, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import './ToDo.css';
import db from '../firebase';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ToDo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false); // by default not open
    const [input, setInput] = useState("");

    let updateTodo = () => {
        //uppdate the todo with the input text
        
        db.collection('todos').doc(props.todoItem.id).set({
            task: input
        }, { merge: true });
        setOpen(false);

    }



    const Check = (e) => {
        
        // e.target.parentElement.parentElement.previousElementSibling.style.textDecoration="line-through";
        e.preventDefault()
        let text = e.target.previousElementSibling.childNodes[0].childNodes[0];
       

        if(text.classList.contains("line_through")) {
            text.classList.remove("line_through");  
            e.target.previousElementSibling.childNodes[0].childNodes[1].textContent="Complete it"
            e.target.nextSibling.style.display="block";
        }
        else{
            text.classList.add('line_through');
            e.target.nextSibling.style.display="none";
            e.target.previousElementSibling.childNodes[0].childNodes[1].textContent="Completed"
        }
    }
    return (
        <>

            <Modal
                open={open}
                onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    {/* <input placeholder={props.todoItem.todo} value={input} onChange={event => setInput(event.target.value)}/> */}
                    <form>
                        <FormControl>
                            <InputLabel>Type here to update</InputLabel>
                            <Input placeholder={`Old Value = ${props.todoItem.todo}`} value={input} onChange={(event) => setInput(event.target.value)} />
                            <Button type="submit" onClick={updateTodo}>Update todo</Button>
                        </FormControl>
                    </form>
                </div>
            </Modal>

            <List className="todo__list">
                <ListItem>
                    <ListItemText primary={props.todoItem.todo} secondary="Complete it" className="todo"></ListItemText>
                </ListItem>

                <Button type="submit" className="btn-todo checkBtn" onClick={Check} style={{ backgroundColor: "#e2e2e2",height:"35px"}}>
                        {/* <AssignmentTurnedInIcon style={{ color: "green"}}></AssignmentTurnedInIcon> */}
                    </Button>

                    <Button className="btn-todo" onClick={e => setOpen(true)} style={{ backgroundColor: "#3f51b5" }}>
                        <EditIcon style={{ color: "rgb(252, 252, 0)" }}></EditIcon>
                    </Button>
                
                <Button className="btn-todo" style={{ backgroundColor: "#e2e2e2" }} type="submit" onClick={event => db.collection('todos').doc(props.todoItem.id).delete()}>
                    <DeleteForeverIcon style={{ color: "red" }}
                    className="icon-bt trash-btn" />
                </Button>
                
            </List>
        </>
    )
}

export default ToDo;