import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderCard extends Component {
    render() {
        const { id, users } = this.props
        const user = users[id]
        return (
            <div className='leader_board'>
                <div className="leader_avatar">
                    <div className="icon">

                    </div>
                    <img src={user.avatarURL} alt="avatar" />
                </div>
                <div className="leader_done">
                    <div className="leader_name">
                        {user.name}
                    </div>
                    <div className="answ_questions">
                        Answered questions <span>{Object.keys(user.answers).length}</span>
                    </div>
                    <div className="created_questions">
                        created questions <span>{user.questions.length}</span>
                    </div>
                </div>
                <div className="leader_score">
                    <div className="score_n">
                        <p> Score </p>
                    </div>
                    <div className="score">
                        <p>{Object.keys(user.answers).length + user.questions.length}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}
export default connect(mapStateToProps)(LeaderCard)