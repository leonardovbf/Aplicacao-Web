const db = require('../models')

db.connectedAndSync({alter: true, force: true})
.then(()=> {process.exit(0)})
.catch(err => { console.error(err); process.exit(1); });