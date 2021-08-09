import logout from './logout'

function errorHandling (e) {
    if (e.code === 16 && e.message === 'Invalid Token') {
      logout()
    }
}

export default errorHandling