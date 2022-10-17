import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false

    }
    handleInputChange = (e) => {
        var option = e.target.name
        var optionText = e.target.value
        if (optionText.length > 60) {
            this.setState((prevState) => {
                [option] = prevState[option].slice(0, 50)
            })
        } else {
            this.setState({
                [option]: optionText
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(handleAddQuestion(this.state))
        this.setState({
            toHome: true
        })
    }
    render() {
        if (this.state.toHome) {
            return <Redirect to="/home" />;
        }
        return (
            <div className="new_question">
                <div className="new_question_header">
                    Create New Question
                </div>
                <div className="new_question_body">

                    <form>
                        <p>Complete the question :</p>
                        <h3>Would you rather...</h3>
                        <div className="question_input">
                            <input type="text" name={"optionOne"} placeholder='Enter Question One Here' value={this.state.optionOne} onChange={this.handleInputChange} />
                            <div className="input_counter" style={this.state.optionOne.length > 48 ? { display: 'block' } : { display: 'none' }}>{60 - this.state.optionOne.length}</div>
                        </div>
                        <div className="separator">
                            <span>OR</span>
                        </div>
                        <div className="question_input">
                            <input type="text" name={"optionTwo"} placeholder='Enter Question Two Here' value={this.state.optionTwo} onChange={this.handleInputChange} />
                            <div className="input_counter" style={this.state.optionTwo.length > 48 ? { display: 'block' } : { display: 'none' }} >{60 - this.state.optionTwo.length}</div>
                        </div>
                        <button onClick={this.handleSubmit} disabled={this.state.optionOne === '' || this.state.optionTwo === ''}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {

    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(NewQuestion)