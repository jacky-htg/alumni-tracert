import Tracert from './tracert';
import Cookies from 'js-cookie'

export default class extends Tracert{
  constructor(proto, appraiserRegistrationInput) {
    super(proto)
    this.req = appraiserRegistrationInput 
  }
  registration() {
    const token = Cookies.get("token");
    return this.client.alumniAppraiserCreate(this.req, { token }).then((appraiser) => {
      return appraiser;
    });
  }
  get() {
    const token = Cookies.get('token')
    return this.client
      .alumniAppraiserGet(this.req, { token })
      .then((appraiser) => {
        return appraiser;
      });
  }
}