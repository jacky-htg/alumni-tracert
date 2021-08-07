import Tracert from './tracert';
import Cookies from 'js-cookie';

export default class extends Tracert{
  constructor(proto, Legalize) {
    super(proto)
    this.req = Legalize 
  }
  create (){
    const token = Cookies.get('token')
    return this.client.legalizeCreate(this.req, {token}).then(out => {
        return out
    })
  }
}