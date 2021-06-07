import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/conversation'
import Input from "./Input";
import Message from "./Message";

const mapStateToProps = (state) => {
    return state;
};

class Right extends Component {
    constructor(props) {
        super(props);
        this.bodyRef = React.createRef();
        this.state = {
            _conversationIndex: -1,
        }
    }

    scrollDown() {
        this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
    }

    componentDidMount() {
        const _conversationIndex = this.props.items.findIndex(conversation => conversation.conversationId === parseInt(this.props.match.params.id))
        this.setState({_conversationIndex: _conversationIndex})

        this.props.fetchMessages(parseInt(this.props.match.params.id))
            .then(() => this.scrollDown())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.state._conversationIndex !== -1
            && this.props.items[this.state._conversationIndex].messages?.length
            && prevProps.items[this.state._conversationIndex].messages?.length
        ) {
            this.scrollDown();
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white" ref={this.bodyRef}>
                    {
                        this.state._conversationIndex !== -1 ?
                            this.props.items[this.state._conversationIndex].messages
                                ?.map((message, index) => <Message message={message} key={index}/>)
                            : ''
                    }
                </div>
                <Input id={parseInt(this.props.match.params.id)}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, actionCreators)(Right);
