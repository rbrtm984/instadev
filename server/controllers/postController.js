const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const fs = require('fs');
const path = require('path');

const PostController = {};

function base64_encode(file) {
    try {
        return "data:image/jpeg;base64," + fs.readFileSync(file, 'base64');
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while encoding the image');
    }
}

PostController.addPost = async (req, res, next) => {
    try {
        const img = req.file.filename;

        // Validate input
        if (typeof img !== 'string' || img.trim() === '') {
            throw new Error('Invalid input');
        }

        const encodedImage = base64_encode(path.join(__dirname, img));

        const newPost = new Post({
            img: encodedImage
        });
        const post = await newPost.save();
        res.locals.newPost = post;
        return next();
    } catch (err) {
        console.error(err);
        return next({});
    }
}

PostController.getUserPosts = async (req, res, next) => {
    try {
        const { username } = req.params;

        // Validate input
        if (typeof username !== 'string' || username.trim() === '') {
            throw new Error('Invalid input');
        }

        const user = await User.findOne({ username: username });
        const posts = await Post.find({ userId: user._id });
        res.locals.UserPosts = posts;
        return next();
    } catch (err) {
        console.error(err);
        return next({});
    }
}

module.exports = PostController;