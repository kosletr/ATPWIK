const swaggerAutogen = require('swagger-autogen')();

swaggerAutogen(
    `${__dirname}/swagger_output.json`,
    [`${__dirname}/../index.js`],
    {
        host: 'localhost:3001',
    }
);
