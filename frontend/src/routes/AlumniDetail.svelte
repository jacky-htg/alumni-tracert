<script>
  import Sidebar from "../components/Sidebar.svelte";
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { navigate } from 'svelte-routing'
  import { Alumni } from '../../proto/alumni_message_pb'
  import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
  import AlumniService from '../services/alumni';
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'

  const onBack = () => {
    navigate(PATH_URL.LIST_ALUMNI, { replace: true })
  }

  async function alumniListCall(proto){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			},
		}

    const alumni = new AlumniService(deps, proto)
    return await alumni.get()
	}

  onMount(async () => {
		try {
      const urlParams = new URLSearchParams(window.location.search);
      if(!urlParams.has('id')) {
        navigate(PATH_URL.LIST_ALUMNI, { replace: true })
      }
      console.log(urlParams.get('id'));
      const alumniProto = new Alumni()
      alumniProto.setId(urlParams.get('id'))
			const alumniResp = await alumniListCall(alumniProto);
      console.log('ALUMNI = ', alumniResp.toObject());
    } catch(e) {
      notifications.danger(e.message)
    }
	})
</script>

<div>
  <Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN}/>
  
</div>