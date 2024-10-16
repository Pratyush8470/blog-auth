const topicSchema = require("../model/db/topic");


const addtoPic =  async (req, res) => {
    
    const topic = await topicSchema.find({});

    console.log("topicAdd", topic);
    
    res.render("topic", {topic});
}

const addTopic = async (req, res) => {

    const add = new topicSchema({
        topicName : req.body.topicName,
        userId : req.user._id
    })

    try{
        const newTopic = await add.save();
        console.log("newTopic", newTopic);
        res.redirect("/add_TopicForm");
    }catch(error){
        console.log(error);
    }
}


module.exports = { addtoPic, addTopic }