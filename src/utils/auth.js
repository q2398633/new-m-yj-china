const TOKEN_KEY = 'token'

export const setUser = (data) => {
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}

export const getUser = () => {
    return JSON.parse(window.localStorage.getItem(TOKEN_KEY))
}

export const removeUser = () => {
    window.localStorage.removeItem(TOKEN_KEY)
}
