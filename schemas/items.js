const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    name: 'string', 
    status: 'string',
    ordering:'string',
 });


 module.exports = mongoose.model('items',schema);