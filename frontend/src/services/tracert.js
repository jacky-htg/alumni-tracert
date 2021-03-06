import { HOST_URL, APP_ENV } from '../env'
import Cookies from 'js-cookie'

export default class{
  constructor(deps){
      this.proto = deps.proto
      const token = Cookies.get('token') 
      if (token) {
        this.client = new deps.proto.TracertClient(HOST_URL, { token }, null)
      } else {
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