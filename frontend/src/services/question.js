import Tracert from './tracert';
import Cookies from 'js-cookie'

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

  resultList() {
    const token = Cookies.get('token')
    // sementara
    return this.client.alumniList(this.req, { token })
  }
}