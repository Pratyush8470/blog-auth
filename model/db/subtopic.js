const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
    subTopic: { type: String, required: true },
    topics: { type: mongoose.Schema.Types.ObjectId, ref: 'topic', required: true }
});

module.exports = mongoose.model('subTopic', subTopicSchema);