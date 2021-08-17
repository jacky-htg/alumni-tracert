<script>
  import { onMount } from 'svelte'
  import { StringMessage } from '../../../proto/generic_message_pb'
  import LegalizeService from '../../services/legalize'
  import { TracertServicePromiseClient } from '../../../proto/tracert_service_grpc_web_pb'
  import { notifications } from '../../helper/toast'

  export let id

  let ijazahSigned = null
  async function myLegalizeCall() {
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalizeService = new LegalizeService(deps, new StringMessage().setData(id))
    return await legalizeService.check() 
  }

  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  onMount(async () => {
		try {
      const legalize = await myLegalizeCall()
      const aCreated = legalize.getCreated().split(" ")
      const created = new Date(aCreated[0]+" "+aCreated[1])
      const expired = new Date(aCreated[0]+" "+aCreated[1])
      addMonths(expired, 6)
      
      const today = new Date()
      if (expired.getTime() < today.getTime()) {
        throw {message:"E-legalisir telah kadaluwarsa"}
      }

      ijazahSigned = legalize.getIjazahSigned() 
    } catch(e) {
      notifications.danger(e.message)
    }
	})
  
</script>

<div>
  <object title="ijazah" data="{ijazahSigned}" type="application/pdf" width="100%" height="800px">
      alt : <a href="ijazahSigned">Ijazah</a>
  </object>
</div>
