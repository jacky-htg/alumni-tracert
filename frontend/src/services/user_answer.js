import Tracert from './tracert_login';

export default class extends Tracert{
  constructor(proto, UserAnswer) {
    super(proto)
    this.req = UserAnswer 
  }
  answer (){
      return this.client.userAnswerCreate(this.req, {}).then(userAnswer=>{
          return userAnswer
      })
  }
}