import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post:{
                ...this.props.post
            }
         };
    }
    render() {
        // console.log(this.props)
        return (
            <div className="col-sm-6 mb-2">
                <div className="card py-2 px-2">
                    <div className="card-body">
                        <span className="float-right"
                         style={{cursor: 'pointer',
                         color:'red', padding: '2px 5px', background: '#ddd'}}
                         onClick={() => {this.props.deletePosthandler(this.state.post._id)}}>x</span>
                        <h5 className="card-title">{this.state.post.title}</h5>
                        <p className="card-text">{this.state.post.description}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;