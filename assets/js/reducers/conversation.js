import {ADD_MESSAGE, GET_CONVERSATIONS, RECIEVE_MESSAGES, SET_LAST_MESSAGE} from "../constants/actionTypes";

export default (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    hubUrl: null,
    username: null
}, action) => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                items: action.items
            }
        case RECIEVE_MESSAGES:
            const _newConversations = state.items.map((conversation) => conversation.conversationId === action.conversationId
                ? Object.assign({}, conversation, {messages: action.messages})
                : conversation
            );
            return {
                ...state,
                items: _newConversations
            }
        case SET_LAST_MESSAGE:
            const _newConversationsWithLastMessage = state.items.map((conversation) => conversation.conversationId === action.conversationId
                ? (conversation.content = action.message.content,
                    conversation.createdAt = action.message.createdAt,
                    Object.assign({}, conversation))
                : Object.assign({}, conversation)
            );
            return {
                ...state,
                items: [..._newConversationsWithLastMessage]
            }

        case ADD_MESSAGE:
            const _newItemsFinal = state.items.map(item => item.conversationId === action.conversationId
                ?
                Object.assign({}, item, {messages: [...item.messages, action.message]})
                : Object.assign({}, item)
                );
            return {
                ...state,
                items: [..._newItemsFinal]
            };
        default:
            return state;
    }
}