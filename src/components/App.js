import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleGetUsers } from '../actions/users';
import Signin from "./Signin"
import Home from "./Home"
import LeaderBoard from './LeaderBoard'
import NewQuestion from "./NewQuestion";
import QuestionHolder from './QuestionHolder'
import Nav from './Nav'
import ErrorPage from './ErrorPage'

class App extends Component {
    componentDidMount() {
        Promise.resolve(handleGetUsers())
            .then((value) => {
                this.props.dispatch(value)
            })
    }
    render() {
        return (
            <>
                <LoadingBar />
                <Router>
                    <Switch>
                        <Route path={['/', '/login']} exact component={Signin} />
                        {this.props.loading
                            ?
                            <Route path={['/', '/login']} component={Signin} />
                            :
                            <Route path='/'>
                                <Route path={['/home', '/questions/:id', '/add', '/leaderboard']} exact component={Nav} />
                                <Switch>
                                    <Route path='/home' exact component={Home} />
                                    <Route path='/questions/:id' component={QuestionHolder} />
                                    <Route path='/add' exact component={NewQuestion} />
                                    <Route path='/leaderboard' exact component={LeaderBoard} />
                                    <Route path='/' component={ErrorPage} />
                                </Switch>
                            </Route>
                        }
                    </Switch>
                </Router>
            </>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser === null,
    }
}

export default connect(mapStateToProps)(App)