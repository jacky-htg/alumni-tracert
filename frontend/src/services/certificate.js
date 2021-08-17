import Tracert from './tracert';
import Cookies from "js-cookie";


export default class extends Tracert{
  constructor(proto, user) {
    super(proto)
    this.req = user 
  }
  create (){
      return this.client
        .certificateCreate(this.req, { token: Cookies.get("token") })
        .then((certificate) => {
          return certificate;
        });
  }
}