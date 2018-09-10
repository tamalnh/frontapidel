import React, { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props); 
    }

    submithandler = (e) => {
        e.preventDefault() 
 
        this.props.loginUser(this.state) 
        // console.log(this.state.email)
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div className="login-wrapper">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-sm-6 offset-sm-3  text-center">
                            <h1 className="display-4">login</h1>
                            <div className="border border-secondary py-3 px-3">
                                <form className="form-group" onSubmit={this.submithandler}>
                                    <input 
                                    type="email" className="form-control mb-3" 
                                    name="email" placeholder="enter email...."
                                    onChange={this.handleChange}
                                    />
                                    <input 
                                    type="password" className="form-control mb-5" 
                                    name="password" placeholder="enter password...." 
                                    onChange={this.handleChange}/>
                                    <button type="submit" className="btn btn-dark"> Login in </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;