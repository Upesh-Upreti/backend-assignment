const Uid = require('uid-generator');

const uid = new Uid();

const generateUid = async () => await uid.generate();

module.exports = generateUid;