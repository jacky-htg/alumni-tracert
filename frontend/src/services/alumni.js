import Tracert from './tracert';

export default class extends Tracert{
  constructor(proto, alumni) {
    super(proto)
    this.req = alumni 
  }
  create (){
      return this.client.alumniCreate(this.req, {}).then(alumni=>{
          return alumni
      })
  }
}