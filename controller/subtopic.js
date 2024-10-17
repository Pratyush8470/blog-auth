const subTopicSchema = require("../model/db/subtopic.js");
const topicSchema = require("../model/db/topic.js")

const subToPic = async (req, res) => {

    try {
        const topics = await topicSchema.find({});
        console.log("add Subtopics", topics);

        const subTopics = await subtopicSchema.find({}).populate("topicId");
        console.log("done", subTopics);

        res.render("subtopic", { topics, subTopics });
    } catch (error) {
        console.log("Error subtopics:", error);
    }
}


const addsubTopics = async (req, res) => {
    try {
        const { topicName, subTopicName } = req.body;

        const topic = await topicSchema.findById(topicName);
        console.log("addSubTopic", topic);

        console.log("ok", topic._id);
        const subTopic = new subTopicSchema({
            subTopicName: subTopicName,
            topicId: topic._id,

        });
        const newSubTopic = await subTopic.save();
        console.log("new :", newSubTopic);

        res.redirect("/showTopics");


    } catch (error) {

        console.log("Error :", error);
    }
};

const showTopic = async (req, res) => {
    try {
        const topics = await topicSchema.find({});
        console.log("addSubTopic", topics);

        const subTopics = await subTopicSchema.find({}).populate("topicId");
        console.log("addSubTopic", subTopics);

        res.render("viewtopic", { topics, subTopics });
    } catch (error) {
        console.log("Error subtopics:", error);
    }
}
const deletsubTopic= async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSubTopic = await subTopicSchema.deleteOne({ _id: id });

        console.log("Deleted:", deleteSubTopic);

        res.redirect("/showTopics");
    } catch (error) {

        console.log("Error:", error);
    }
};

module.exports = { subToPic, addsubTopics, showTopic, deletsubTopic };