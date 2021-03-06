import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Reset.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
// AXIOS
import axios from 'axios';
// HEADER/FOOTER/HOME
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
// LOGIN/REGISTER
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
// PROJECTS
import ProjectCreate from './components/ProjectCreate.jsx';
import ProjectView from './components/ProjectView.jsx';
import ProjectEdit from './components/ProjectEdit.jsx';
import ProjectViewAll from './components/ProjectViewAll.jsx';
// TASKS
import TaskCreate from './components/TaskCreate.jsx';
import TaskEdit from './components/TaskEdit.jsx';
import TaskList from './components/TaskList.jsx';
import UserTaskList from './components/UserTaskList.jsx';
//COLLABORATORS
import CollaboratorList from './components/CollaboratorList.jsx';
import CollaboratorCreate from './components/CollaboratorCreate.jsx';
// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';
import UserProfileEdit from './components/UserProfileEdit.jsx';
import UserPasswordEdit from './components/UserPasswordEdit.jsx';
// MESSAGES
import MessagesAll from './components/MessagesAll.jsx';
import MessageCreate from './components/MessageCreate.jsx';
import MessageSingle from './components/MessageSingle.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        fireRedirect: false,
        apiDataloaded:false,
        currentPage: 'home',
        loggedIn: false,
        toggleNav: false
    }
    // AUTH
    this.logOut =  this.logOut.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit =this.handleRegisterSubmit.bind(this);
    // Create Project
    this.handleCreateProject = this.handleCreateProject.bind(this);
    // custom
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  handleLoginSubmit(e, username, password) {
      e.preventDefault();
      axios.post('/auth/login', {
          username,
          password,
      }).then(res => {
        this.setState({
            auth: res.data.auth,
            user: res.data.user,
            fireRedirect: true,
            loggedIn: (res.data.user),
        });
         //window.location = "/home";
      }).catch(err => console.log(err));
  }

  handleRegisterSubmit(e, username, firstname, lastname, password, email, user_type) {
    e.preventDefault();
    axios.post('/auth', {
       username,
       firstname,
       lastname,
       password,
       email,
       user_type,
    }).then(res => {
       this.setState({
           auth: res.data.auth,
           user: res.data.user,
           fireRedirect: true,
           currentPage: 'home',
           userDataLoaded:true,
           loggedIn: (res.data.user),

       });
    }).catch(err => console.log(err));
  }

  logOut() {
    console.log("log out");
    axios.get('/auth/logout')
    .then(res => {
        console.log(res.body);
        this.setState({
            auth: false,
            user:null,
            fireRedirect: true,
        });
      }).catch(err => console.log(err));
   }


// Handle Create Project
  handleCreateProject(e, name, description, category, status, planned_start_date, planned_end_date) {
    e.preventDefault();
    axios.post('/project', {
      name,
      description,
      category,
      status,
      planned_start_date,
      planned_end_date,
    }).then(res => {
      this.setState({
        user: res.data.user,
        project: res.data,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }

  handleToggleNav(toggleNav){
    // run code here depending if toggle nav is true or false
    // make the state of the nav bar depend on toggle nav
  }

  openNav() {
    document.getElementById("mySidenav").style.width = `100%`;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header userData={this.state.user} logOut={this.logOut}/>
          <main>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path="/projectCol/:id" render={(props) => <CollaboratorCreate proj_id={props.match.params.id}  />} />

            <Route exact path='/login' render={() => {
              if(this.state.loggedIn){
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
                }
              else
                return <Login handleLoginSubmit={this.handleLoginSubmit} />
              }} />

            <Route exact path='/register' render={() => {
              if(this.state.loggedIn){
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
                }
              else
                return <Register handleRegisterSubmit={this.handleRegisterSubmit}
                    username={this.props.username}
                    firstname={this.firstname}
                    lastname={this.lastname}
                    password={this.password}
                    email={this.email}
                    user_type={this.user_type} />
              }} />


            <Route exact path="/user/id/:id" render={() => {
               if(!this.state.loggedIn)
                  return <Login/>
                else
                  return <UserProfile  loggedIn={this.state.auth} user={this.state.user}/>
               }}/>
            <Route exact path="/CollaboratorList" render={() => <CollaboratorList proj_id={2}/>} />

            <Route exact path="/user" render={() => <UserProfile user={this.user} />} />
            <Route exact path="/userEdit/:id" render={(props) => <UserProfileEdit  userData={this.state.user} />} />

            <Route exact path="/userPassword/:id" render={(props) => <UserPasswordEdit  userData={this.state.user} />} />

            <Route exact path="/projectList" render={() => <ProjectViewAll  for_User={true} user={this.state.user}/>} />

            <Route exact path="/project" render={() => <ProjectCreate handleCreateProject={this.handleCreateProject} user={this.state.user} />} />
            <Route exact path="/projectEdit/:id" render={(props) => <ProjectEdit id={props.match.params.id} project={this.project} />} />

            <Route exact path="/project/:id" render={(props) => <ProjectView id={props.match.params.id} project={this.project} />} />

            <Route exact path="/projectList/:id" render={(props) => <ProjectView id={props.match.params.id}   presentDetail={true} project={this.project}  userData={this.state.user}  />} />

            <Route exact path="/projectTask/:id" render={(props) => <TaskCreate proj_id={props.match.params.id} user_id={this.state.user.id}  />} />

            <Route exact path="/taskEdit/:task_id" render={(props) => <TaskEdit task_id={props.match.params.task_id} userData={this.state.user} />} />

            <Route exact path="/usertasklist/:user_id" render={(props) => <UserTaskList userData={this.state.user}  user_id={props.match.params.user_id} />} />

            <Route exact path="/messages" render={() => <MessageCreate user={this.state.user}/>} />

            <Route exact path="/messagesAll" render={() => <MessagesAll user={this.state.user}/>} />

            <Route exact path="/  /:id" render={(props) => <MessageSingle id={props.match.params.id} user={this.state.user} />} />

          </main>
        </div>
      </Router>
    );
  }
}

export default App;
