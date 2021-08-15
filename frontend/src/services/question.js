import Tracert from './tracert';

export default class extends Tracert{
  constructor(proto, questionGroupListInput) {
    super(proto)
    this.req = questionGroupListInput 
  }
  list (){
      return this.client.questionList(this.req, {}).then(questionGroupList=>{
          return questionGroupList
      })
  }
}