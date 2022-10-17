import React, { Component } from 'react'
import { connect } from 'react-redux'

class PollResults extends Component {

    userVote = () => {
        const { question, authedUser, users } = this.props
        return users[authedUser].answers[question.id]
    }
    render() {
        const { question, user } = this.props
        var votesOne = question.optionOne.votes.length,
            votesTwo = question.optionTwo.votes.length;
        var allVotes = votesOne + votesTwo;
        var ratioOne = votesOne / allVotes * 100
        var ratioTwo = votesTwo / allVotes * 100
        return (
            <div className="poll poll_results">
                <div className="poll_header">
                    Asked by   {user.name} :
                </div>
                <div className="poll_body  ">
                    <div className="poll_avatar">
                        <img src={user.avatarURL} alt="avatar" />
                    </div>
                    <div className="poll_content">
                        <p className='poll_content_ask'>Results</p>
                        <div className="question_option option_res">
                            <p>Would you rather {question.optionOne.text} ?</p>
                            <div className="results_bar">
                                <div className="ratio" style={{ width: `${ratioOne}%` }}>

                                </div>
                                <p>{ratioOne.toFixed(2) + '%'}</p>
                            </div>
                            <p>{`${votesOne} of ${allVotes} `}</p>
                            <div className="your_vote" style={this.userVote() === 'optionOne' ? { display: 'block' } : {}}>
                                Your <br /> Vote
                            </div>

                        </div>

                        <div className="question_option option_res">
                            <p>Would you rather  {question.optionTwo.text} ?</p>
                            <div className="results_bar">
                                <div className="ratio" style={{ width: `${ratioTwo}%` }}>
                                    <p>{ratioTwo.toFixed(2) + '%'}</p>
                                </div>
                            </div>
                            <p>{`${votesTwo} of ${allVotes} `}</p>
                            <div className="your_vote" style={this.userVote() === 'optionTwo' ? { display: 'block' } : {}} >
                                Your < br /> Vote
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    return {
        authedUser,
        user: users[questions[id].author],
        question: questions[id],
        users

    }
}
export default connect(mapStateToProps)(PollResults)