import React from 'react';
import Conversation from "./Conversation";


export default class Left extends React.Component {
    render() {
        return (
            <div className="col-5 px-0">
                <div className="bg-white">
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="h5 mb-0 py-1">Recent</p>
                    </div>
                    <div className="messages-box">
                        <div className="list-group rounded-0">
                            <Conversation conversation="test"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}