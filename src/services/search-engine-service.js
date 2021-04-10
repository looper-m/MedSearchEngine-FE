const URL = 'http://localhost:4000/';

export const searchQuery = (query, from) =>
    fetch(`${URL}/search?q=${query}&from=${from}`)
        .then(response => response.json())

export const getDocumentById = (docId) =>
    fetch(`${URL}/document/${docId}`)
        .then(response => response.json())

const api = {searchQuery, getDocumentById}

export default api