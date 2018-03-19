'use strict'

const config = {
    db: {},
    client: {
      // estos endpoints son los de produccion
      endpoints: {
        pictures: 'http://localhost:5000',
        users: 'http://localhost:5001',
        auth: 'http://localhost:5002'
      }
    },
    secret: 'senagram'
  }
  
  module.exports = config