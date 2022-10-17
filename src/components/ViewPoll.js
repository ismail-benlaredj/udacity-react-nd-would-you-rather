import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class ViewPoll extends Component {
    toQuestion = (e, question) => {
        e.preventDefault()
        this.props.history.push(`/questions/${question}`)
    }
    render() {
        const { users, questions, question } = this.props
        const author = users[questions[question].author]
        return (
            <div className="poll">
                <div className="poll_header">
                    {author.name} asks:
                </div>
                <div className="poll_body">
                    <div className="poll_avatar">
                        <img src={author.avatarURL} alt="" />
                    </div>
                    <div className="poll_content">
                        <p className='poll_content_ask'>Would you rather</p>
                        <p className='poll_content_qst'>{`...${questions[question].optionTwo.text.slice(0, 13)}...`}</p>
                        <button onClick={(e) => { this.toQuestion(e, question) }}>View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        users,
        questions,
    }
}
export default withRouter(connect(mapStateToProps)(ViewPoll))