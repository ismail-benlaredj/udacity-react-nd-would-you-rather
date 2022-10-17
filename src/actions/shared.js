import { _getQuestions, _saveQuestion } from "../backend/_DATA";
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { addQuestionToUser } from "./users";
import { receiveQuestions, addQuestion } from "./questions";


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.resolve(_getQuestions())
            .then((questions) => {
                // dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                // dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })

    }
}

export function handleAddQuestion({ optionOne, optionTwo }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return _saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
            .then(question => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))
                dispatch(hideLoading())
            })

    }
}