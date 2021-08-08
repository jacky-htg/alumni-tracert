import Tracert from './tracert';
import Cookies from 'js-cookie';

export default class extends Tracert{
  constructor(proto, Legalize) {
    super(proto)
    this.req = Legalize 
  }
  create (){
    const token = Cookies.get('token')
    return this.client.legalizeUpdate(this.req, {token}).then(out => {
        return out
    })
  }
  getOwn (){
    const token = Cookies.get('token')
    return this.client.legalizeGetOwn(this.req, {token}).then(out => {
        return out
    })
  }
  rating (){
    const token = Cookies.get('token')
    return this.client.legalizeRating(this.req, {token}).then(out => {
        return out
    })
  }
}