export const HOST_URL = 'https://api.anter.poltekkes-medan.ac.id';
import {TracertServicePromiseClient} from '../proto/single-proto_grpc_web_pb';

export default class {
  constructor(deps) {
    this.proto = deps.proto;
    this.client = new deps.proto.TracertClient(HOST_URL, null, null);
  }
}

export const deps = {
  proto: {
    TracertClient: TracertServicePromiseClient,
  },
};
