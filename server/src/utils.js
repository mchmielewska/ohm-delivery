const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmByTrackingId(trackingId) {
  const _db = await db;
  const ohm = _db.get('ohms')
      .find({ trackingId })
      .value()
  return ohm;
}

async function getOhmById(id) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ id })
        .value()
    return ohm;
}

async function updateOhmStatus(trackingId, status, message) {
  const _db = await db;
  const ohm = _db.get('ohms')
    .find({ trackingId })
    .value()
  const ohmObject = _db.get('ohms')
    .find({ trackingId })

  if (ohm.status === 'IN_DELIVERY') {

    if (message) ohm.comment = message
    ohm.status = status;

    ohm.history.push({
      state: ohm.status,
      at: Date.now().toString(),
    })

    ohmObject.assign({ 
      status: ohm.status, 
      history: ohm.history,
      comment: ohm.comment
    }).write()
  }

  return ohm

}

module.exports = { getOhmById, getOhmByTrackingId, updateOhmStatus }