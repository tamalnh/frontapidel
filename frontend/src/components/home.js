import React, { Component } from 'react';
import axios from 'axios';
import Posts from './posts';
import AddPost from './addPost'

const BASE_URL = 'http://localhost:3030/api/posts/';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            posts: null
         };
    }

    componentDidMount(){
        fetch(BASE_URL)
            .then(res => res.json())
            .then(posts => {
                // console.log(posts.posts)
                this.setState({
                    posts: [...posts.posts]
                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    getToken = () => {
        return localStorage.getItem('id_token')
    }

    addNewPost = (newPost) => {

        let postUrl = 'http://localhost:3030/api/posts'
        // let post = {
        //     title: newPost.title,
        //     description: newPost.description,
        //     author: this.props.user.id
        // }
        const headers = {
            "Content-type": "application/json",
            'authorization' : `Bearer ${this.getToken()}`
        }
        if(newPost){
            fetch(postUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    title: newPost.title,
                    description: newPost.description,
                    author: this.props.user.id
                })
            })
            .then(res => res.json())
                .then(post => { 
                    if(post){
                        let newPosts = this.state.posts;
                            newPosts.push(post.post)
                        this.setState({
                            posts: newPosts
                        })
                    }
                })
            .catch(error => {
                console.log(error)
            })  
        }
    }

    deletePosthandler = (id) => { 
        let postURL = 'http://localhost:3030/api/posts'
        fetch(`${postURL}/${id}`, {
            method: 'delete',
            headers: {
                "Content-type": "application/json",
            }

        })
        .then(res => res.json())
        .then(deletedPost => {
            if(deletedPost){
                let index = this.state.posts.findIndex(post => {
                    return post.id === id
                })

                let newPosts = [...this.state.posts]
                    newPosts.splice(index, 1)
                this.setState({
                    posts: newPosts
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderPosts = () => {
        if(this.state.posts !== null){
            return <Posts posts={this.state.posts} deletePosthandler={this.deletePosthandler}/>
        }
    }

    render() {
        // console.log(this.state.posts)
        return (
            <div className="home-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 offset-sm-9">
                            <span> logged user email: {this.props.user.email} </span>
                        </div>
                    </div>

                    <div className="row"> 
                        <AddPost addNewPost={this.addNewPost} />
                    </div>

                    <div className="row">
                       {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;