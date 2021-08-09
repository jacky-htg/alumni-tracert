import Cookies from "js-cookie"

function logout () {
    Cookies.remove('token')
    Cookies.remove('usertype')
    Cookies.remove('userid')
    Cookies.remove('username')
}

export default logout