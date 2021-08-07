import Tracert from './tracert';
import { token } from '../stores/token'

export default class extends Tracert{
  constructor(proto, UserAnswer) {
    super(proto)
    this.req = UserAnswer 
  }
  answer (){
      return this.client.userAnswerCreate(this.req, null).then(userAnswer=>{
          return userAnswer
      })
  }
}