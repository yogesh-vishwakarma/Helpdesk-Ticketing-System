const dns = require('dns').promises;
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
}

module.exports = main;


