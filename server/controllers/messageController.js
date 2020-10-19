const Message = require('./../models/messageModel');
var MD5 = require("crypto-js/md5");

/* -------------------------------------------------------------------------- */
/*                               Message Controller                           */
/* -------------------------------------------------------------------------- */

exports.getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({
            status: 'success',
            results: messages.length,
            messages: messages.reverse()
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'failed'
        });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: { message }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'failed'
        });
    }
};

exports.createMessage = async (req, res) => {
    try {
        let gravatar = MD5(req.body.email).toString()
        req.body.image = `https://www.gravatar.com/avatar/${gravatar}.jpg`;

        const newMsg = await Message.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                message: newMsg
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent'
        });
    }
}

