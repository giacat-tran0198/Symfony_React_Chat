import {ADD_MESSAGE, GET_CONVERSATIONS, RECIEVE_MESSAGES, SET_LAST_MESSAGE} from "../constants/actionTypes";

export const setConversation = (data) => ({
    type: GET_CONVERSATIONS,
    items: data
})

export const setMessages = (data, id) => ({
    type: RECIEVE_MESSAGES,
    messages: data,
    conversationId: id
});

export const setLastMessage = (data, id) => ({
    type: SET_LAST_MESSAGE,
    message: data,
    conversationId: id
});

export const addMessage = (data, id) => ({
    type: ADD_MESSAGE,
    message: data,
    conversationId: id
});

export const fetchConversations = () => dispatch => {
    return fetch(`/conversations/`)
        .then(response => response.json())
        .then(json => dispatch(setConversation(json)))
};

export const fetchMessages = (id) => dispatch => {
    return fetch(`/messages/${id}`)
        .then(response => response.json())
        .then(json => dispatch(setMessages(json, id)))
};

export const postMessage = (content, id) => dispatch => {
    let formData = new FormData();
    formData.append('content', content)
    return fetch(`/messages/${id}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(json => {
            dispatch(setLastMessage(json, id))
            return dispatch(addMessage(json, id))
        })
};