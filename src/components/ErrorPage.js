import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class ErrorPage extends Component {
    render() {
        return (
            <div className='error'>
                <h1>This Page Not Found !!  </h1>

                <Link to={"/home"}>
                    Home page
                </Link>
                <h1 className='header404'>404</h1>
            </div>
        )
    }
}
