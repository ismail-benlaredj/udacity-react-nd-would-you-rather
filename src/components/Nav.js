import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    handleLogout = () => {
        const { dispatch } = this.props
        dispatch(deleteAuthedUser())
        this.props.history.push("/")
    }
    render() {
        const { users, authedUser } = this.props
        return (
            <div className='nav'>
                <div className="nav_container">
                    <NavLink to='/home' exact activeClassName='active_nav' className="nav_item">
                        Home
                    </NavLink>

                    <NavLink to='/add' exact activeClassName='active_nav' className="nav_item">
                        New Questions
                    </NavLink>

                    <NavLink to='/leaderboard' exact activeClassName='active_nav' className="nav_item">
                        Leader Board
                    </NavLink>
                    <div className="nav_item">
                        {`Hello, ${users[authedUser].name} `}
                        <img src={users[authedUser].avatarURL} alt="avatar" />
                    </div>
                    <div className="nav_item" onClick={this.handleLogout}>
                        Logout
                    </div>

                </div>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users,

    }
}

export default connect(mapStateToProps)(Nav)