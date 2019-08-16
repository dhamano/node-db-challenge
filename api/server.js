const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const resourcesRouter = require('./routes/resources');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/resources', resourcesRouter);

server.get('/', (req, res) => {
  res.send('<h2>Five by Five</h2>');
});

module.exports = server;