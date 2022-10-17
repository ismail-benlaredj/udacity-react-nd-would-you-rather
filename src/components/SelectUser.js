import React, { Component } from 'react'
import { connect } from 'react-redux'

class SelectUser extends Component {

    render() {
        const { user } = this.props
        // const { avatar } = user
        return (
            <>
                {/* <div>
                    <img src={user.avatarURL} alt="" />
                </div> */}
                <option value={user.id} >
                    {user.name}
                </option>
            </>
        )
    }
}
function mapStateToProps({ users }, { id }) {
    const user = users[id]


    return {
        user,
    }
}

export default (connect(mapStateToProps)(SelectUser))