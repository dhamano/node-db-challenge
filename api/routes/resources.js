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
    res.status(500).json({ error: 'Failed to get resources' })
  }
})

router.post('/', checkResourceSubmit, async (req, res) => {
  try {
    let resource = await Resources.add(req.body);
    let resourceInfo = await Resources.findById(resource[0]);
    res.status(200).json(resourceInfo);
  }
  catch(err) {
    res.status(500).json({ error: 'Failed to post resource to server' })
  }
});

function checkResourceSubmit(req, res, next) {
  const { resource_name } = req.body;
  if( resource_name === undefined || resource_name.trim() === "") {
    res.status(400).json({ error: 'A resources name is required' });
  } else {
    next();
  }
};

module.exports = router;