const express = require('express');
const Resources = require('../models/resources-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const resources = await Resources.find();
    if(resources.length > 0) {
      res.status(200).json(resources);
    } else {
      res.status(404).json({ message: 'There are currently no resources' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to get resources' });
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const resources = await Resources.findById(id);
    if(resources.length > 0) {
      res.status(200).json(resources[0]);
    } else {
      res.status(404).json({ message: 'There are currently no resources' });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to get resources' });
  }
})

router.post('/', checkResourceSubmit, async (req, res) => {
  try {
    let resource = await Resources.add(req.body);
    let resourceInfo = await Resources.findById(resource[0]);
    res.status(200).json(resourceInfo);
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to post resource to server' });
  }
});

router.put('/:id', checkResourceSubmit, async (req, res) => {
  const { id } = req.params;
  try {
    let resource = await Resources.update(req.body, id);
    if(resource) {
      let resourceInfo = await Resources.findById(id);
      res.status(200).json(resourceInfo);
    } else {
      res.status(404).json({ error: `The resource with id ${id} does not exist` });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to update resource to server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await Resources.remove(id);
    if(isDeleted) {
      res.status(210).json();
    } else {
      res.status(404).json({ error: `The resource with id ${id} does not exist` });
    }
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to delete resource from server' });
  }
})

function checkResourceSubmit(req, res, next) {
  const { resource_name } = req.body;
  if( resource_name === undefined || resource_name.trim() === "") {
    res.status(400).json({ error: 'A resources name is required' });
  } else {
    next();
  }
};

module.exports = router;