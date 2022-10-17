import React, { Component } from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import logo from '../assets/reactredux.png'
import SelectUser from "./SelectUser";
import { Redirect } from 'react-router-dom'

class Signin extends Component {
    state = {
        userId: null,
        redirect: false
    }
    handleSignin = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.userId))
        this.setState({
            redirect: true
        })


    }
    handleChange = (e) => {
        this.setState({
            userId: e.target.value
        })

    }
    render() {
        const { authedUser, selectUsers } = this.props
        if (authedUser !== null) {
            return <Redirect to="/home" />
        }

        return (
            <div className='signin_page'>
                <div className="signin_page_container">
                    <div className="signin_page_header">
                        <h3>Welcome to the Would You Rather App!</h3>
                        <p>Click Sign in to continue </p>
                    </div>
                    <div className="signin_page_body">
                        <img src={logo} alt="" />
                        <h2>Sign in</h2>
                        <form onSubmit={this.handleSignin}>
                            <select onChange={this.handleChange}>
                                <option value="" defaultValue hidden>Select User</option>
                                {Object.keys(selectUsers).map((e) => (
                                    <SelectUser id={selectUsers[e].id} key={selectUsers[e].id} />
                                ))}
                            </select>
                            <button disabled={this.state.userId === null}>Sign In</button>
                        </form>
                    </div>
                </div>

            </div >
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        selectUsers: users,
        authedUser
    }
}

export default connect(mapStateToProps)(Signin)

