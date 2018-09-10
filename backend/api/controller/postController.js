const {Post} = require('./../model/postModel');


const getAllPosts = (req, res, next) => {
    Post.find()
        .then(result => {
            if(result){
                res.status(500).json({
                    message: `${result.length} post found`,
                    posts: result
                })
            }else{
                res.status(404).json({
                    error: "no post found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error occurred'
            })
        })
}

const createNewPost = (req, res, next) => {
    console.log(req.user)
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        like: null,
        author: req.user.id

    })

    post.save()
        .then(result => {
            if(result){
                res.status(200).json({
                    message: "Post created successfully",
                    post: result
                })
            }else{
                res.status(500).json({
                    error: "post creation faild!"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const getSinglePost = (req, res, next) => {
    Post.find({author: req.params.id})
        .populate('author')
        .then(result => {
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "error occurred"
            })
        })

} 

const updateSinglePost = (req, res, next) => {

}

const deletePost = (req, res, next) => {
    let id = req.params.id;
    Post.findByIdAndDelete({_id: id})
            .then(data => {
                if(data !== null){
                    res.status(200).json({
                        message: 'post deleted successfully!'
                    })
                }else{
                    res.status(400).json({
                        message: 'post not found'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'error Occured'
                })
            })
}

module.exports = {
    getAllPosts,
    createNewPost,
    getSinglePost,
    updateSinglePost,
    deletePost
}