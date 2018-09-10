import React, { Component } from 'react';
class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    postSubmitHandler = (e) => {
        e.preventDefault();
        this.props.addNewPost(this.state)
    }

    addPosthandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-sm-6">
                <form className="form-group" onSubmit={this.postSubmitHandler}>
                    <input className="form-control mb-2" name="title" placeholder="type title..." onChange={this.addPosthandler} />
                    <textarea name="description" className="form-control mb-3" placeholder="write something" onChange={this.addPosthandler}> </textarea>

                    <button className="btn btn-primary"> Post </button>
                </form>
            </div>
        );
    }
}

export default AddPost;