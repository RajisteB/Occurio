import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      projectDataLoaded: false,
      fireRedirect: null,
    }
  }

  componentDidMount() {
    axios.get(`/project/${this.props.id}`)
    .then(res => {
      this.setState({
        project: res.data.data,
        projectDataLoaded: true,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }

  renderProject(){
    if (this.state.projectDataLoaded){
        return <div key={this.state.project.id} className="project">
          <h3>{this.state.project.name}</h3>
          <p>{this.state.project.description}</p>
          <p>{this.state.project.category}</p>
          <p>{this.state.project.status}</p>
          <p>{this.state.project.planned_start_datesrt}</p>
          <p>{this.state.project.planned_end_datestr}</p>
          <p>{this.state.project.act_start_date}</p>
          <p>{this.state.project.act_end_date}</p>
          <Link className='viewProject'  to={`/task`} >Add task</Link>
          <TaskList proj_id={this.state.project.id} user_id={0}  proj={true} />
        </div>
      }
    }

  render() {
    return (
      <div className="viewProject">
        {this.renderProject()}
      </div>
    )
  }
}

export default ProjectView;
