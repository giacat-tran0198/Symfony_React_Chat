export const fetchConversations = () => dispatch => {
    dispatch(requestConversations());
    return fetch(`/conversations/`)
        .then(response => response.json())
        .then(json => {
            return dispatch(receiveConversations(json))
        })
};
