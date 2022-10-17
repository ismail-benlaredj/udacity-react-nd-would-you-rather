import React, { Component } from 'react'
import { connect } from 'react-redux';
import LeaderCard from "./LeaderCard";
class LeaderBoard extends Component {
    render() {
        const { users } = this.props
        return (
            <>
                {users.map(e => (<LeaderCard id={e} key={e} />))}
            </>
        )
    }
}

function order(users) {
    var tab = Object.keys(users).sort((a, b) => {
        var answersB = users[b].answers
        var answersNumB = Object.keys(answersB).length
        var questionNumB = users[b].questions.length
        var scoreB = answersNumB + questionNumB

        var answersA = users[a].answers
        var answersNumA = Object.keys(answersA).length
        var questionNumA = users[a].questions.length
        var scoreA = answersNumA + questionNumA

        return scoreB - scoreA
    })
    return tab
}

function mapStateToProps({ users }) {
    return {
        users: order(users)
    }
}
export default connect(mapStateToProps)(LeaderBoard)