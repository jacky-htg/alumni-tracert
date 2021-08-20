<script>
  import { onMount } from 'svelte'
  import { StringMessage } from '../../../proto/generic_message_pb'
  import LegalizeService from '../../services/legalize'
  import { TracertServicePromiseClient } from '../../../proto/tracert_service_grpc_web_pb'
  import { notifications } from '../../helper/toast'
  import { addMonths } from '../../helper/date'

  export let id

  let transcriptSigned = null
  async function myLegalizeCall() {
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalizeService = new LegalizeService(deps, new StringMessage().setData(id))
    return await legalizeService.check() 
  }

  onMount(async () => {
		try {
      const legalize = await myLegalizeCall()
      const aCreated = legalize.getCreated().split(" ")
      const expired = new Date(aCreated[0]+" "+aCreated[1])
      addMonths(expired, 6)
      
      const today = new Date()
      if (expired.getTime() < today.getTime()) {
        throw {message:"E-legalisir telah kadaluwarsa"}
      }

      transcriptSigned = legalize.getTranscriptSigned() 
    } catch(e) {
      notifications.danger(e.message)
    }
	})
  
</script>

<div>
  <object title="transcript" data="{transcriptSigned}" type="application/pdf" width="100%" height="800px">
      alt : <a href="transcriptSigned">Transcript</a>
  </object>
</div>
