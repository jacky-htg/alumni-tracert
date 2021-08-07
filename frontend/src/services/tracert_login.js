import { HOST_URL, APP_ENV } from '../env'

export default class{
  constructor(deps){
      console.log(deps.token)
      this.proto = deps.proto
      this.client = new deps.proto.TracertClient(HOST_URL, {
        'token': deps.token
      }, null)

      console.log(token)
      
      if (APP_ENV === 'development') {
        const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {})
        enableDevTools([
          this.client,
        ]);
      }
  }
}