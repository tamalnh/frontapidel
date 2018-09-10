import React, { Component } from 'react';
import Post from './post'
class Posts extends Component {
    constructor(props) {
        super(props); 
    }



    
    render() {
        // console.log(this.props.posts)
        return (
            <div className="col-sm-12">
                {this.props.posts.reverse().map((post, index) => {
                    return <Post key={index} post={post} deletePosthandler={this.props.deletePosthandler}/>
                })}
            </div>
        );
    }
}

export default Posts;