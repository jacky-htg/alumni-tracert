import Tracert from './tracert';
import Cookies from 'js-cookie'

export default class extends Tracert{
  constructor(proto, UserAnswer) {
    super(proto)
    this.req = UserAnswer 
  }
  answer (){
      return this.client.userAnswerCreate(this.req, {'token':Cookies.get('token')}).then(userAnswer=>{
          return userAnswer
      })
  }
}