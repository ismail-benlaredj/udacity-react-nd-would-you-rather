import { RECEIVE_QUESTIONS, ADD_QUESTIONS, ANSWER_QUESTION } from "../actions/questions"

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }

        case ADD_QUESTIONS:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case ANSWER_QUESTION:
            const { qid, answer, authedUser } = action.answer
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            };
        default:
            return state
    }
}