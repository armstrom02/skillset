const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const messageRouter = require('./routes/messageRoutes');

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */
if (process.env.NODE_ENV == 'development ') {
    app.use(morgan('dev'));
}

// implementing CORS
app.use(cors());
// Access-Control-Allow-Origin *
app.options('*', cors());

app.use(express.json());


/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.use('/api/v1/message', messageRouter);

module.exports = app;