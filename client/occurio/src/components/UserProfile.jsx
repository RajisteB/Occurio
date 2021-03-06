import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';
import '../User.css';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id:null,
            username: '',
            fullname: '',
            user_type:'',
        }
        this.getDateTime = this.getDateTime.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            axios.get(`/user/id/${this.props.user.id}`)
                .then(res => {
                    this.setState({
                        user_id: res.data.user.id,
                        username: res.data.user.username,
                        fullname: res.data.user.fullname,
                        user_type: res.data.user.user_type,
                        email: res.data.user.email,
                    })
                }
            )
        }
    }

    getDateTime() {
        var period;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();
        return period = {
            day: days[d.getDay()],
            date: d.getDate(),
            year: d.getFullYear(),
            hour: d.getUTCHours(),
            min: d.getMinutes(),
            month: months[d.getMonth()],
        }
    }
    render() {

    return (
        <div className="user-container">
            <div className="user-flex">
                <div className="user-info">
                    <div className="user-pic">
                        <img alt="" src="http://www.doyouknowja.com/upload/profile-pic/default-user.jpg"/>
                    </div>
                    <div className="user-details">
                        <h1>Hey, {this.state.fullname}.</h1>
                        <h2>{this.state.username}</h2>
                        <h3>{this.state.email}</h3>
                        <Link className='link-to' to={`/userEdit/${this.props.user.id}`} >Edit Profile</Link>
                        <br/>
                        <br/>
                        <Link className='link-to'   to={`/userPassword/${this.props.user.id}`} >Change Password</Link>
                    </div>
                </div>
                <div className="user-links">
                    <div className="links" id="timenow">
                        <span><h2>{(this.getDateTime()).day}</h2></span>
                        <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
                        <h2>{(this.getDateTime()).month} {(this.getDateTime()).date} {(this.getDateTime()).year}</h2>
                    </div>
                    <div className="links">
                            <i className="fa fa-plus-square fa-2x" aria-hidden="true"></i>
                    {(this.state.user_type==="Manager") ?
                            <Link to={'/project'}>Create A Project</Link>
                    : <Link to="#">No access to create A Project</Link>}
                    </div>
                    <div className="links">
                        <i className="fa fa-thumb-tack fa-2x" aria-hidden="true"></i>

                        <Link to={'/projectList'}>View Your Projects</Link>
                    </div>

                    <div className="links">
                        <i className="fa fa-tasks fa-2x" aria-hidden="true"></i>
                        <Link to={`/usertasklist/${this.state.user_id}`}>View Your Tasks</Link>
                        <br/>
                        <br/>
                        <i className="fa fa-comments fa-2x" aria-hidden="true"></i>
                        <Link to={'/messages'}>View Your Messages</Link>

                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default UserProfile;
