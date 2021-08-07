import { HOST_URL, APP_ENV } from '../env'
import { token } from '../stores/token'

export default class{
  constructor(deps){
      this.proto = deps.proto
      if (token) {
        console.log('ada token')
        this.client = new deps.proto.TracertClient(HOST_URL, {
          'token': token
        }, null)
      } else {
        console.log('tidak ada token')
        this.client = new deps.proto.TracertClient(HOST_URL, null, null)
      }

      if (APP_ENV === 'development') {
        const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {})
        enableDevTools([
          this.client,
        ]);
      }
  }
}