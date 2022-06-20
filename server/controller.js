require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '987c7917deec4b63b2c22d7fddf0fae5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

//send a critical error about how boring this app is (unassociated from an endpoint)
rollbar.critical('This app is so boring');

module.exports = {
    addEmail: (req, res) => {
        const {email} = req.body;
        sequelize.query(`
            INSERT INTO emails(email)
            VALUES ('${email}');
        `)
            .then(() => {
                rollbar.info('User added to database');
                rollbar.warn('Duplicate users are not restricted');
                res.status(200).send('Successfully subscribed')
            })
            .catch((err) => console.log(err));
    },

    removeEmail: (req, res) => {
        const {email} = req.body;
        sequelize.query(`
            DELETE FROM emails WHERE email IN ('${email}');
        `)
            .then(() => {
                rollbar.warn('User unsubscribed. Operation may have been unsuccessful if not previously in db');
                res.status(200).send('You have been unsubscribed')
            })
            .catch((err) => console.log(err));
    },

    useBadMethod: (req, res) => {
        try{
            nonExistentFunction();
        } catch (err) {
            rollbar.error(err);
        }
        res.status(200).send('GET successful at /dne');
    }
}