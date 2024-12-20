require('dotenv').config()
const neo4j = require('neo4j-driver');

let driver;
let session;
const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
const user = process.env.NEO4J_USER || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'password';

const connectToDatabase = () => {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    session = driver.session();
};

const getSession = () => session;

module.exports = {
    connectToDatabase,
    getSession,
};
