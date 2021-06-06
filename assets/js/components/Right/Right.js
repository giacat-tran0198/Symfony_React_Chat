import React, {Component} from 'react';
import Message from "./Message";
import Input from "./Input";


export default class Right extends Component {
    render() {
        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white">
                    <Message/>
                </div>
                <Input/>
            </div>
        )
    }
}
