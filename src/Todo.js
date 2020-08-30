import React,{ useState } from 'react'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FormControl,InputLabel,Input } from '@material-ui/core';
import db from './firebase';

  
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
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

function Todo({todo}) {

    const [done, setDone] = useState('')
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [newtodo, setNewTodo] = useState(todo.todo)

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleDone = () =>{
        setDone('line-through')
    }

    const handleUnDone = () =>{
        setDone('')
    }

    const handleUpdate = (e) =>{

        e.preventDefault()

        db.collection('todos').doc(todo.id).set({
            todo: newtodo
        },{ merge: true})

        setOpen(false)
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <form style={{width: '100%', textAlign: 'center'}}>
              <FormControl style={{width: "100%"}}>
                <InputLabel>Edit Todo</InputLabel>
                <Input value={newtodo} onChange={e => setNewTodo(e.target.value)} type="text" />
              </FormControl>
              <Button style={{width: '50%', marginTop: '20px'}} onClick={handleUpdate} type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
        </div>
      );

    let button

    if(done === ''){
        button = <Button onClick={handleDone} variant="contained" style={{marginRight:'10px'}}>
            <DoneIcon></DoneIcon>
        </Button>
    }else{
        button = <Button onClick={handleUnDone} variant="contained" style={{marginRight:'10px'}}>
            <CloseIcon></CloseIcon>
        </Button>
    }


    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
        >
            {body}
        </Modal>


        <List>
            <ListItem>
                <ListItemText
                    style={{textDecoration: done}}
                    primary={todo.todo}
                />
                {button}
                <Button onClick={handleOpen} variant="contained" color="primary" style={{marginRight:'10px'}}>
                    <EditIcon></EditIcon>
                </Button>
                <Button onClick={e=>db.collection('todos').doc(todo.id).delete()} variant="contained" color="secondary">
                    <ClearIcon></ClearIcon>
                </Button>
            </ListItem>
        </List> 
        </>       
    )
}

export default Todo
