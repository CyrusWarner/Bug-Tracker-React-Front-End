import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Home from './Components/Home/home';
import ShowBoard from './Components/ShowBoard/showBoard';
import NavBar from './Components/NavBar/navBar';
import "./app.css"
import axios from 'axios';
const App = () => {
  const [users, setUsers] = useState([]);
  const [userBoards, setUsersBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect (() => {
    if(currentUser.length !== 0){
      getUsers()
      getUsersBoards()
    }
  }, [currentUser])

  const getUsers = async () => {
    await axios.get("http://localhost:27029/api/User").then((res) => {
      if (res.status === 200) {
        setUsers(res.data)
      }
    })
    .catch((err) => {
      if (err){
        console.log(err)
        //COME BACK AND ADD TOASTIFY
      }
    })
  }

  const getUsersBoards = async () => {
    let userId = currentUser.userId
    await axios.get(`http://localhost:27029/api/Board/${userId}`).then((res) => {
      if(res.status == 200){
        setUsersBoards(res.data)
      }
    })
    .catch((err) => {
      if(err){
        console.log(err)
        //COME BACK AND ADD TOASTIFY
      }
    })
  }

  const createCurrentUser = (user) => {
    setCurrentUser(user)
  }

  const getCurrentBoard = async () => {
    await axios.get("http://localhost:27029/api/Board/CurrentBoard/14").then((res) => {
      if (res.status == 200) {
        setCurrentBoard(res.data[0])
      }
    })
    .catch((err) => {
      if(err){
        //ADD TOASTIFY NOTIFICATION HERE
        console.log(err)
      }
    })
  }

  return (
    <React.Fragment>
      <Router>
      <NavBar />
        <Switch>
        <Route path="/" exact  render={(props) => <Home {...props}  currentUser={currentUser} userBoards={userBoards} getUsersBoards={getUsersBoards} getCurrentBoard={getCurrentBoard} currentBoard={currentBoard}/>} /> 
        <Route path="/Login"  render={(props) => <Login {...props} createCurrentUser={createCurrentUser} />}  />
        <Route path="/Signup"  render={(props) => <Signup {...props} />} />
        <Route path="/ShowBoard/:id" render={(props) => <ShowBoard {...props} currentBoard={currentBoard}/>} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
