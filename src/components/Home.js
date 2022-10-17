import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';

import ViewPoll from './ViewPoll'
class Home extends Component {
    state = {
        questions: "unansw"
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleInitialData())
    }
    render() {
        const { unanswered, answered } = this.props
        return (
            <div className="home_container">
                <div className="home_questions">
                    <div className="questions_nav">
                        <div className={this.state.questions === "unansw" ? "home_active_cat" : ""}
                            onClick={() => (this.setState({
                                questions: "unansw"
                            }))}
                        >
                            Unanswered Questions
                        </div>
                        <div className={this.state.questions === "answ" ? "home_active_cat" : ""}
                            onClick={() => (this.setState({
                                questions: "answ"
                            }))}
                        >
                            Answered Questions
                        </div>
                    </div>
                </div>
                {this.state.questions === "unansw"
                    ?
                    unanswered.map(e => (<ViewPoll key={e} question={e} />))
                    :
                    answered.map(e => (<ViewPoll key={e} question={e} />))
                }



            </div>
        )
    }
}

function unansweredTab(questions, authedUser) {
    var tab = Object.keys(questions).filter(e =>
    (
        (questions[e].optionOne.votes.findIndex(elem => (elem === authedUser)) === -1)
        &&
        (questions[e].optionTwo.votes.findIndex(elem => (elem === authedUser)) === -1)
    )
    )
    tab.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    return tab
}

function answeredTab(questions, authedUser) {
    var tab = Object.keys(questions).filter(e =>
    (
        (questions[e].optionOne.votes.findIndex(elem => (elem === authedUser)) !== -1)
        ||
        (questions[e].optionTwo.votes.findIndex(elem => (elem === authedUser)) !== -1)
    )
    )
    tab.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    return tab
}

function mapStateToProps({ authedUser, users, questions, }) {
    return {
        authedUser,
        users,
        questions,
        unanswered: unansweredTab(questions, authedUser),
        answered: answeredTab(questions, authedUser),

    }
}
export default connect(mapStateToProps)(Home)
