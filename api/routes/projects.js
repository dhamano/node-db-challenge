const express = require('express');
const Projects = require('../models/projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const projects = await Projects.find();
    if(projects.length > 0) {
      const projectsWithBool = changeToBool(projects);
      res.status(200).json(projectsWithBool);
    } else {
      res.status(404).json({ message: 'There are currently no projects' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const projects = await Projects.findById(id);
    if(projects.length > 0) {
      const projectsWithBool = changeToBool(projects);
      res.status(200).json(projectsWithBool[0]);
    } else {
      res.status(404).json({ message: 'There are currently no projects' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
})

router.get('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  try{
    const tasks = await Projects.findTasks(id);
    if(tasks.length > 0) {
      const tasksWithBool = changeToBool(tasks);
      res.status(200).json(tasksWithBool);
    } else {
      res.status(404).json({ message: 'There are currently no tasks' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to get tasks' })
  }
});

router.post('/', checkProjectSubmit, async (req, res) => {
  try {
    const project = await Projects.add(req.body);
    let projectInfo = await Projects.findById(project[0]);
    projectInfo = changeToBool(projectInfo);
    res.status(200).json(projectInfo);
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to post project to server' });
  }
});

router.put('/:id', checkProjectSubmit, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.update(req.body, id);
    if(project) {
      let projectInfo = await Projects.findById(id);
      projectInfo = changeToBool(projectInfo);
      res.status(200).json(projectInfo[0]);
    } else {
      res.status(404).json({ error: `Project with id ${id} does not exits` });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to update project to server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await Projects.remove(id);
    if(isDeleted) {
      res.status(210).json();
    } else {
      res.status(404).json({ error: `The project with id ${id} does not exist and cannot be deleted` })
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to delete project to server' });
  }
})

function checkProjectSubmit(req, res, next) {
  const { project_name } = req.body;
  if( project_name === undefined || project_name.trim() === "") {
    res.status(400).json({ error: 'A project name is required' });
  } else {
    next();
  }
};

function changeToBool(projects) {
  const projectsWithBool = projects.map( project => {
    if(typeof project.project_completed !== 'boolean' && project.project_completed === 1) {
      project.project_completed = true;
    } else {
      project.project_completed = false;
    }
    return project;
  })
  return projectsWithBool;
}

module.exports = router;