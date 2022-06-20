import cookie from 'js-cookie'

//Cookie set
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            //Day
            expires: 1
        })
    }
}


//Cookie remove
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

//Cookie get as token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

//localstorage set
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//Localstorage remove
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}


//User Auth
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

//Signout
export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
}

//User info get - localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

//User data update - localstorage
export const updateUser = (response, next) => {
    if (window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}