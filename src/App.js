import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import axios from 'axios';
const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect (() => {
    if(currentUser){
      getUsers()
    }
  }, [])
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
  return (
    <React.Fragment>
      <Router>
        <Switch>
        <Route path="/" exact  /> 
        <Route path="/Signup"  render={(props) => <Signup {...props} />} />
        <Route path="/Login"  render={(props) => <Login {...props} />} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
