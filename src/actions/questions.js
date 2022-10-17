import { _saveQuestionAnswer } from "../backend/_DATA";
import { addAnswerToUser } from "./users"
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function addQuestion(question) {
    return {
        type: ADD_QUESTIONS,
        question,
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function answerQuestion(answer) {
    return {
        type: ANSWER_QUESTION,
        answer,
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const info = {
            authedUser,
            qid,
            answer
        }
        return _saveQuestionAnswer(info)
            .then(() => {
                dispatch(answerQuestion(info))
                dispatch(addAnswerToUser(info))
            })
    }
}