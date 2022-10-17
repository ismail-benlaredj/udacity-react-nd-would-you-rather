import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'


class Question extends Component {
    state = {
        option: null
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { id, dispatch } = this.props
        const { option } = this.state
        dispatch(handleAnswerQuestion(id, option))
    }
    render() {
        const { question, user } = this.props

        return (
            <div className="poll question">
                <div className="poll_header">
                    {user.name} asks:
                </div>
                <div className="poll_body">
                    <div className="poll_avatar">
                        <img src={user.avatarURL} alt="" />
                    </div>
                    <div className="poll_content">
                        <p className='poll_content_ask'>Would you rather</p>
                        <div className="question_option">
                            <input type="radio" id="one" name='option' value={question.optionOne.text} onChange={() => (this.setState({ option: "optionOne" }))} />
                            <label htmlFor="one">{question.optionOne.text}</label>
                        </div>

                        <div className="question_option">
                            <input type="radio" id="two" name='option' value={question.optionTwo.text} onChange={() => (this.setState({ option: "optionTwo" }))} />
                            <label htmlFor="two">{question.optionTwo.text}</label>
                        </div>
                        <button disabled={this.state.option === null} onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {

    return {
        id,
        authedUser,
        user: users[questions[id].author],
        question: questions[id],
    }
}
export default connect(mapStateToProps)(Question)