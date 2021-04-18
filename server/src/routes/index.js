const router = require('express').Router();
const Utils = require('../utils');

router.get('/:id', async (req, res) => {
    const ohm = await Utils.getOhmByTrackingId(req.params.id);
    res.send(ohm);
})

router.post('/:id', async (req, res) => {
    const ohm = await Utils.updateOhmStatus(req.params.id, req.body.status, req.body.message);
    res.send(ohm);
})

module.exports = router;