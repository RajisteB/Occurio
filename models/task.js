const db= require("../db/config");

const task={
  assignTasks: function(task){
    return db.one("INSERT INTO tasks(user_id, proj_id, name, description, start_date, end_date, status, ticket) VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                   [task.user_id, task.proj_id, task.name, task.description, task.start_date, task.end_date,
                   task.status, task.ticket])
  },

  updateTasks: function(task,task_id){
    if (task.user_type==="Manager"){
      return db.none("UPDATE tasks set  user_id=$1, name=$2, description= $3, start_date= $4, end_date= $5, act_start_date= $6, act_end_date= $7, status= $8, ticket=$9 WHERE id=$10",
                     [task.user_id, task.name, task.description, task.start_date, task.end_date, task.act_start_date, task.act_end_date,
                     task.status, task.ticket, task_id])
    }else{
      return db.none("UPDATE tasks set   act_start_date= $1, act_end_date= $2, status= $3, ticket=$4 WHERE id=$5", [ task.act_start_date, task.act_end_date, task.status, task.ticket, task_id])

    }
  },

  deleteTask: function(tasksId){
    return db.none("DELETE FROM tasks WHERE id = $1", [tasksId])
  },

  findProjectTasks :function(task){
      return db.query(" SELECT t.*, to_char(t.start_date,'yyyy-MM-dd') as start_dateStr, to_char(t.end_date,'yyyy-MM-dd') as end_dateStr, concat(u.firstname , ' ', u.lastname) as fullname FROM tasks t INNER JOIN users u ON  t.user_id = u.id WHERE t.proj_id = $1  order by t.id" + task.filter, [task.proj_id])
  },

  findCollaboratorsTasks :function(task){
    return db.query("SELECT t.*, to_char(t.start_date,'yyyy-MM-dd') as start_dateStr, to_char(t.end_date,'yyyy-MM-dd') as end_dateStr, concat(u.firstname , ' ', u.lastname) as fullname FROM tasks t INNER JOIN users u ON  t.user_id = u.id WHERE  user_id = $2 order by t.id", [task.proj_id, task.user_id])
  },

  findById :function(task_id){
    return db.one("SELECT  t.*, to_char(t.start_date,'yyyy-MM-dd') as start_dateStr, to_char(t.end_date,'yyyy-MM-dd') as end_dateStr, to_char(t.act_start_date,'yyyy-MM-dd') as act_start_dateStr, to_char(t.act_end_date,'yyyy-MM-dd') as act_end_dateStr,u.id as userid, concat(u.firstname , ' ', u.lastname) as fullname,u.user_type FROM tasks t INNER JOIN users u ON  t.user_id=u.id WHERE t.id=$1 " , [task_id])
  }
}

module.exports = task
