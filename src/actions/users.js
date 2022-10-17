import { _getUsers } from '../backend/_DATA'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}



export async function handleGetUsers() {
    return (dispatch) => {
        return _getUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
            })
    }
}


export function addQuestionToUser(question) {
    return {
        type: ADD_QUESTION_TO_USER,
        question,
    }
}

export function addAnswerToUser(answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        answer
    }
}
