import Tracert from './tracert';
import Cookies from 'js-cookie'

export default class extends Tracert{
  constructor(proto, alumniListInput) {
    super(proto)
    this.req = alumniListInput 
  }
  alumniList (){
    const token = Cookies.get('token')
    return this.client.alumniList(this.req, { token })
    // .then(alumni=> { return alumni })
  }
}