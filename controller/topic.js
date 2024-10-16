const topicModel = require('../model/db/topic');
const subTopicModel = require('../model/db/subtopic');

const topic = (req, res) => {

    res.render('topic');
}

const addTopic = async (req, res) => {

    const topicData = new topicModel({
        topic: req.body.topic
    })
    console.log("topicData", topicData);

    const topic = await topicData.save();
    res.redirect('/view-topic');
}

const viewTopic = async (req, res) => {

    let topicData = await topicModel.find();
    // console.log("topicData", topicData);

    let subTopic = await subTopicModel.find({}).populate('topics');
    console.log("subTopic", subTopic);


    res.render('view-topic', { topicData, subTopic, userImg: req.user.path, fname: req.user.fname, lname: req.user.lname, email: req.user.email });
}

const deleteTopic = async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await topicModel.deleteOne({ _id: id });
        res.redirect('/view-topic');
        // console.log("topic", topic);
    } catch (error) {
        res.send("error");
    }
}

const subTopic = async (req, res) => {
    const topic = await topicModel.find({});
    // console.log("topic", topic);

    const subTopic = await subTopicModel.find({}).populate('topics');
    // console.log("subTopic", subTopic);

    res.render('sub-topic', { topic, subTopic });
}

const addSubTopic = async (req, res) => {

    // console.log("req", req.body);

    try {

        const subTopicData = new subTopicModel({
            topics: req.body.topicOption,
            subTopic: req.body.subTopic
        })

        const subTopic = await subTopicData.save();

        // console.log("subTopic", subTopic);
        res.redirect('/view-topic');

    } catch (error) {
        console.log("error", error);
    }

}

module.exports = { topic, addTopic, viewTopic, deleteTopic, subTopic, addSubTopic };