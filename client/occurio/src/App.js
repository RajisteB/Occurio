import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
import ProjectViewAll from './components/ProjectViewAll.jsx';
// TASKS
import Task from './components/Task.jsx';
import TaskList from './components/TaskList.jsx';
//COLLABORATORS
import CollaboratorList from './components/CollaboratorList.jsx';

// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';

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

    // custom
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }



  logOut() {
      axios.get('/auth/logout')
      .then(res => {
          console.log(res);
          this.setState({
              auth: false,
              user:null,
              fireRedirect: true,
          });
          window.location = "/home";
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
          {/* <Home /> */}
          <main>
            <Route exact path='/home' render={() => <Home />} />
            <Route exact path='/login' render={() => {
              if(this.state.loggedIn)
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
              else
                return <Login />
              }} />
            <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit}
              username={this.props.username}
              firstname={this.firstname}
              lastname={this.lastname}
              password={this.password}
              email={this.email}
              user_type={this.user_type} />} />

             <Route exact path="/user/id/:id" render={() => {
               if(!this.state.loggedIn)
                  return <Login/>
                else
                  return <UserProfile  loggedIn={this.state.auth} user={this.state.user}/>
               }}/>

            <Route exact path="/collaborators" render={() => <CollaboratorList proj_id={2}/>} />
            <Route exact path="/taskList" render={() => <TaskList proj_id={1} user_id={12}  proj={false} />} />
            <Route exact path="/user" render={() => <UserProfile user={this.user} />} />
            <Route exact path="/projectList" render={() => <ProjectViewAll />} />
            <Route exact path="/project" render={() => <ProjectCreate handleCreateProject={this.handleCreateProject} />} />
            <Route exact path="/projectList/:id" render={(props) => <ProjectView id={props.match.params.id}   presentDetail={true} project={this.project} />} />
            <Route exact path="/projectList/task/:id" render={(props) => <Task id={props.match.params.id}  />} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}


export default App;
