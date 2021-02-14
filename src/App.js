import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import LogButton from './components/LogButton.jsx';
import NameSelect from './components/NameSelect.jsx';
import UserTag from './components/UserTag.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("Anna 1");
  const [loggedUsers, setLoggedUsers] = useState([]);

  console.log(loggedUsers);

  useEffect(() => {
    getUsersDatabase();
    const storageName = localStorage.getItem('name');
    const storageLoggedIn = localStorage.getItem('loggedIn');
    if(storageName !== "" || storageName !== null) {
      console.log("name in storage: "+storageName)
      setName(storageName);
    }
    if(storageLoggedIn) {
      console.log("storage loged in ")
      setLoggedIn(true);
    }
  }, []);

  const changeLog = () => {
    if(name !== null) {
      localStorage.setItem('name', name);
      checkUserDatabase(name)
    }
    setLoggedIn(!loggedIn);
  }

  const loginDatabase = (user) => {
    axios.post(`/users/${user}.json`, Date.now())
        .then(response => {
          let newLoggedUsers = loggedUsers.concat(user)
          setLoggedUsers(newLoggedUsers);
          console.log(user + " user logged in")
        });
        localStorage.setItem('loggedIn', 'true');
  }

  const logOutDatabase = (user) => {
    axios.delete(`/users/${user}.json`)
        .then(response => {
          console.log(user + " user logged in")
        });
    console.log(user + " user logged out")
    localStorage.removeItem('loggedIn');
    let newLoggedUsers = loggedUsers.filter(u => u !== user)
    setLoggedUsers(newLoggedUsers);
    console.log(newLoggedUsers)
  }

  const getUsersDatabase = () => {
    axios.get('/users.json')
      .then(response => {
        if(Object.keys(response.data).length > 0) {
          const allLoggedUsers = [];
          Object.keys(response.data).map(loggedUser => {
            allLoggedUsers.push(loggedUser)
          })
          setLoggedUsers(allLoggedUsers)
        }
      })
      .catch(err=> {
        console.log(err);
    });
  }

  setInterval(()=> {
    getUsersDatabase()
  }, 20000)

  const checkUserDatabase = (user) => {
    axios.get(`/users/${user}.json`)
        .then(response => {
          console.log(response)
          if(response.data) {
            logOutDatabase(user);
          } else {
            loginDatabase(user);
          }
        })
        .catch(err=> {
          console.log(err);
      });
  }

  const changeName = (event) => {
    setName(event.target.value)
    console.log(name)
  }

  return (
    <div className="App">
      <h1>Atelier Auslastung</h1>
      <div style={{"marginBottom": "10px"}}>
        <NameSelect usersIn={loggedUsers} logged={loggedIn} selectedName={name} onChangeName={changeName} />
        <LogButton logged={loggedIn} changeLog={changeLog} />
      </div>
      {loggedUsers.map((user, i) => {
        return <UserTag key={i} userName={user} />
      })}
    </div>
  );
}

export default App;
