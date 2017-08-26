import React, { Component } from 'react';
import axios from 'axios';

class TaskList extends Component {
  constructor() {
    super();
    // state
    this.state = {
      user_id: null,
      proj_id: null,
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: 'Pending',
      ticket: '',
      task_id:0,
      collaboratorData:null,
      collaboratorDataLoaded:false,
      taskData: null,
      taskDataLoaded: false,
      mainDataLoad:false,
    },
    this.renderTaskList =this.renderTaskList.bind(this);
    this.handlerDeleteTask = this.handlerDeleteTask.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      user_id:this.props.user_id,
      proj_id:this.props.proj_id,
      mainDataLoad:true,
    })
    this.handlerReloadList();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.task_id != this.state.task_id ) {
      this.handlerReloadList();
    }
  }

  handleTaskSubmit(e, user_id, proj_id, name, description, start_date, end_date, status, ticket) {
    e.preventDefault();
    axios.post('/task', {
      user_id,
      proj_id,
      name,
      description,
      start_date,
      end_date,
      status,
      ticket,
    }).then(res => {
      this.setState({
        taskData: res.data.data,
        task_id:  res.data.data.id,
        taskDataLoaded:false,
      })
    }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handlerReloadList() {
    let proj_id=this.props.proj_id;
    let user_id=this.props.user_id;
    let filter="";
    axios.post(`/task/${proj_id}`,{
       proj_id,
       user_id,
       filter,
    })
    .then(res=>{
      this.setState({
        taskData: res.data.data,
        taskDataLoaded: true,
      })
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handlerDeleteTask(task_Id){
    axios.delete(`/task/${task_Id}`)
    .then(()=>{
      this.handlerReloadList();
    })
    .catch(err=>{
      console.log(err);
    })
  }
  //task list
  renderTaskList() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Ticket</th>
              <th>Status</th>
              <th>Collaborator</th>
            </tr>
          </thead>
          <tbody>
          {(this.state.taskDataLoaded) ?
            this.state.taskData.map((task,index) => {
              return <tr key={task.id}>
                <td>{index}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.start_datestr}</td>
                <td>{task.end_datestr}</td>
                <td>{task.ticket}</td>
                <td>{task.status}</td>
                <td>{task.fullname}</td>
                <td><input type="submit" value="Edit"/></td>
                <td><input type="submit" value="Delete" onClick={()=>{this.handlerDeleteTask(task.id)}} /></td>
               </tr>
          })
          : ""}

          </tbody>
        </table>
      </div>
    );
  }

  renderSubmitform(){
    return(
      <div>
        <div>
          <h2>*******</h2>
          <h2>*******</h2>
          <h2>*******</h2>
          <h2>*******</h2>
          <h2>*******</h2>
          <h2>*******</h2>
          <h2>*******</h2>
        </div>
        <div className="form">
          <form onSubmit={(e) => this.handleTaskSubmit(
            e,
            this.state.user_id,
            this.state.proj_id,
            this.state.name,
            this.state.description,
            this.state.start_date,
            this.state.end_date,
            this.state.status,
            this.state.ticket
          )}>

            <div>
              <label className="labelInput" >Name </label>
              <input className="form" type="text" name="name" value={this.state.name} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput" >Descripcion </label>
              <textarea className="form" name="description" value={this.state.description} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput" >Planned start date </label>
              <input className="form" type="date" name="start_date" value={this.state.start_date} placeholder="" onChange={this.handleInputChange} />

              <label className="labelInput" >Planned end date </label>
              <input className="form" type="date" name="end_date" value={this.state.end_date} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput">Status</label>
              <select name="status"  onChange={this.handleInputChange}>
                <option name="status" key="1" value={"Done"}>Pending</option>
                <option name="status" key="2" value={"In progress"}>In progress</option>
                <option name="status" key="3"  value={"Canceled"}>Canceled</option>
              </select>
            </div>

            <div>
              <label className="labelInput" >Ticket</label>
              <input className="form" type="text" name="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} />
            </div>
            <div>
                <input className="form" type="submit" value="Enter" />
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderSubmitform()}
        {this.renderTaskList()}
      </div>
    )
  }
}

export default TaskList;
