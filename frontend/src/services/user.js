import Tracert from './tracert';

export default class extends Tracert{
  constructor(proto, user) {
    super(proto)
    this.req = user 
  }
  create (){
      return this.client.userCreate(this.req, {}).then(user=>{
          return user
      })
  }
}