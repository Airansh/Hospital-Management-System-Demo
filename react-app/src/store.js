
export var isLoggedIn = false
export var role = ''

export function setIsLoggedIn(state) {
    isLoggedIn = state
}
export function getIsLoggedIn() {
    return isLoggedIn
}
export function setRole(state) {
    role = state
}
export function getRole(){
    return role
}
