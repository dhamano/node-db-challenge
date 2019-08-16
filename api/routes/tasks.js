const express = require('express');
const Tasks = require('../models/tasks-model');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const tasks = await Tasks.find(id);
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

router.post('/:id', checkTaskSubmit, async (req, res) => {
  try {
    let task = await Tasks.add(req.body);
    let taskInfo = await Tasks.findById(task[0]);
    taskInfo = changeToBool(taskInfo);
    res.status(200).json(taskInfo);
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to post task to server' })
  }
});

function checkTaskSubmit(req, res, next) {
  const { task_desc } = req.body;
  const { id } = req.params;
  req.body.project_id = parseInt(id);
  if( task_desc === undefined || task_desc.trim() === "") {
    res.status(400).json({ error: 'A task name is required' });
  } else {
    next();
  }
};

function changeToBool(tasks) {
  const tasksWithBool = tasks.map( task => {
    if(typeof task.task_completed !== 'boolean' && task.task_completed === 1) {
      task.task_completed = true;
    } else {
      task.task_completed = false;
    }
    return task;
  })
  return tasksWithBool;
}

module.exports = router;