import { HOST_URL } from '../env'

export default class{
  constructor(deps){
      const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {})
  
      this.proto = deps.proto
      this.client = new deps.proto.TracertClient(HOST_URL, null, null)

      enableDevTools([
        this.client,
      ]);
  }
}