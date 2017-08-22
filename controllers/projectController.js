const Project = require("../models/project.js")


projectController={
  //PROJECTS
  create: function(req, res){
    Project.create({
      name :req.body.name,
      description:req.body.description,
      category:req.body.category,
      status:req.body.status,
      planned_start_date:req.body.planned_start_date,
      planned_end_date:req.body.planned_end_date,
    }).then( project =>{
      res.json({
        message:"Done",
        data:project,
      })
    }).catch( err => {
        console.log(err);
        res.status(500).json(err);
    });

  },

  update: function(req,res){

  },

  findAll: function (req, res){
    Project.findAll()
    .then(project => {
      res.json({
        message: 'Done',
        data: project,
      });
    }).catch(err =>{
      res.status(500).json(err);
    })
  },

  findById: function (req, res){
    Project.findById(req.params.id)
    .then(project => {
      res.json({
        message: 'Done',
        data: project,
      });
    }).catch(err =>{
      res.status(500).json(err);
    })
  },

  delete: function (req, res){
    project.delete(req.params.id)
    .then(()=>{
      res.json({
        message:"Done",
      })
    }).catch(err => {
      res.status(500).json(err);
    })

  },

  findCollaborators: function(req, res){

  },

  // PROJECTS COLLABORATOR
  assignCollaborators : function(req, res){

  },


  deleteCollaborators: function(){

  },


  findCollaboratorProjects: function(req, res){

  },


  //COLLABORATORS
  assignTasks: function(req, res){

  },

  updateTasks : function(req, res){

  },

  deleteTask: function(req, res){

  },

  findProjectTasks: function(req, res){

  },

  findCollaboratorsTasks: function (req, res){

  }



}


module.exports= projectController;
