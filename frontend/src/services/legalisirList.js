import Tracert from './tracert';
import Cookies from 'js-cookie'

export default class extends Tracert{
  constructor(proto, legalisirListInput) {
    super(proto)
    this.req = legalisirListInput 
  }
  legalisirList (){
    const token = Cookies.get('token')
    return this.client.legalizeList(this.req, { token })
  }
  legalizeList() {
    const token = Cookies.get('token')
    return this.client.legalizeList(this.req, { token })
  }
}