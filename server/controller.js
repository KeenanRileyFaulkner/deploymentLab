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

module.exports = {
    addEmail: (req, res) => {
        const {email} = req.body;
        sequelize.query(`
            INSERT INTO emails(email)
            VALUES ('${email}');
        `)
            .then(() => res.status(200).send('Successfully subscribed'))
            .catch((err) => console.log(err));
    },

    removeEmail: (req, res) => {
        const {email} = req.body;
        sequelize.query(`
            DELETE FROM emails WHERE email IN ('${email}');
        `)
            .then(() => res.status(200).send('You have been unsubscribed'));
            .catch((err) => console.log(err));
    }
}