export default class{
  constructor(deps){
      const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {})
  
      this.proto = deps.proto
      this.client = new deps.proto.TracertClient('http://localhost:8099', null, null)

      enableDevTools([
        this.client,
      ]);
  }
}