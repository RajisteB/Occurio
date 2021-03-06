import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuDescription:'Login',
      userDataLoaded: false,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.userData ){
      if ( this.state.userDataLoaded === false){
        this.setState({
          menuDescription: this.props.userData.username,
          userDataLoaded:true,
        })
      }
    }
  }

  render() {
    return (
      <header className="header">
            <div className="nav">
              <h1 className="main-header"><Link to={'/'}>Okurio</Link></h1>
            </div>
            <div className="nav2">
              <ul className="nav-list">
                <li className="nav-item "><Link to={'/login'}>{this.state.menuDescription}</Link></li>
                <li className="nav-item" ><Link to={'/'}  > Log out</Link></li>
              </ul>
            </div>
      </header>
    )
  }
}

export default Header;
