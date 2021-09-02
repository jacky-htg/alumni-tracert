import Tracert from './tracert';
import Cookies from "js-cookie";
export default class extends Tracert{
  constructor(proto, loginInput) {
    super(proto)
    this.req = loginInput 
  }
  login (){
      return this.client.login(this.req, {}).then(user=>{
          return user
      })
  }
  forgotPassword (){
      return this.client.forgotPassword(this.req, {}).then(user=>{
          return user
      })
  }
  resetPassword (){
      return this.client.resetPassword(this.req, {}).then(user=>{
          return user
      })
  }
  changePassword (){
      const token = Cookies.get("token");
      return this.client.changePassword(this.req, { token }).then(user=>{
          return user
      })
  }

}