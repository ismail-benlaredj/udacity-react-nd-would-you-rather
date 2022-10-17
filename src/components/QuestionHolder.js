import React, { Component } from 'react'
import Question from './Question'
import PollResults from './PollResults'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import ErrorPage from './ErrorPage';

class QuestionHolder extends Component {
    componentDidMount() {
        const { dispatch, questions } = this.props
        if (Object.keys(questions).length === 0) {
            dispatch(handleInitialData())
        }

    }
    render() {
        const { questions, authedUser, id } = this.props
        return (
            <>


                {
                    questions[id] ?
                        (
                            (questions[id].optionOne.votes.findIndex(elem => (elem === authedUser)) !== -1)
                            ||
                            (questions[id].optionTwo.votes.findIndex(elem => (elem === authedUser)) !== -1)
                        )
                            ?
                            <PollResults id={id} />
                            :
                            <Question id={id} />
                        :
                        <>
                            {
                                (Object.keys(questions).length !== 0 && !questions[id])
                                    ?
                                    <ErrorPage />
                                    :
                                    <></>
                            }
                        </>
                }
            </>
        )

    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    return {
        id,
        authedUser,
        users,
        questions,
    }
}
export default connect(mapStateToProps)(QuestionHolder)