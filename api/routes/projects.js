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
    res.status(500).json({ error: 'Failed to get projects' })
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
    res.status(500).json({ error: 'Failed to post project to server' })
  }
});

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