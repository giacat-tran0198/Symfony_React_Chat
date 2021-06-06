import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class Conversation extends Component {
    render() {
        return (
            <Link to={"/conversation/" + this.props.conversation.conversationId}
                  className="list-group-item list-group-item-action rounded-0">
                <div className="media">
                    <img src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png" alt="user"
                         width="50" className="rounded-circle"/>
                    <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0">Username</h6>
                            <small
                                className="small font-weight-bold">{new Date().toLocaleDateString()}</small>
                        </div>
                        <p className="font-italic mb-0 text-small">Hello</p>
                    </div>
                </div>
            </Link>
        );
    }
}