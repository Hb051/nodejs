//import database object
const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;

//Create and Save New Tutorials
exports.createTutorial = (tutorial) => {
    return Tutorial.create({

        title: tutorial.title,
        description: tutorial.description,
    })
    .then((tutorial) => {
        console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
    })
    .catch((err) => {
        console.log(">> Error while creating tutorial: ",err);
    });
};

//Create and Save New Comments
exports.createComment = (tutorialId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        tutorialId: tutorialId,
    })
    .then((comment) => {
        console.log(">> Created  comment: " + JSON.stringify(comment, null, 4));
        return comment;
    })
    .catch((err) => {
        console.log(">> Error while Creating comment: ",err);
    });
};

//Get the comments for the given tutorial
exports.findTutorialById = (tutorialId) => {
    return Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
        return tutorial;
    })
    .catch((err) => {
        console.log(">> Error while finding tutorial: ",err);
    });
};

//Get the comments for the given comment id
exports.findCommentById = (id) => {
    return (Comment.findByPk(id, {include: ["tutorial"]}))
    .then((comment) => {
        return comment;
    })
    .catch((err) => {
        console.log(">> Error while finding comment: ",err);
    });
};

//Get all Tutorial include comments
exports.findAll = () => {
    return Tutorial.findAll({
        include: ["comments"],
    }).then((tutorials) => {
        return tutorials;
    });
}; 


