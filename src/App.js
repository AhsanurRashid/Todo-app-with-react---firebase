import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl,InputLabel,Input } from '@material-ui/core';
import Todo from './Todo';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','asc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        todo: doc.data().todo
      })))
    })
  },[])

  const addTodo = (e) =>{
    e.preventDefault()
    if(input){
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }else{
      setTodos([...todos])
    }
    setInput('')
  }

  return (
    <div className="App">
      <Container>
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
          <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
            <Typography variant="h3" style={{borderBottom: '3px solid', marginBottom: '40px', paddingBottom: '20px'}}>TODO APP with React & Firebase</Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="flex-start" item xs={12} sm={6}>
            <form style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>
              <FormControl style={{width: "100%"}}>
                <InputLabel>Add Todos</InputLabel>
                <Input value={input} onChange={e => setInput(e.target.value)} type="text" />
              </FormControl>
              <Button style={{width: '50%', marginTop: '20px'}} onClick={addTodo} type="submit" variant="contained" color="primary">
                Send
              </Button>
            </form>
          </Grid>
          <Grid direction="row" justify="center" alignItems="flex-start" item xs={12} sm={6}>
            <Paper>
              <ul>
                {todos.map(todo =>(
                  <Todo key={todo.id} todo={todo}/>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
