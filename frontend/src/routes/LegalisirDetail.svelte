<script>
  import { link } from 'svelte-routing'
  import Sidebar from "../components/Sidebar.svelte";
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { navigate } from 'svelte-routing'
  import { Legalize } from '../../proto/legalize_message_pb'
  import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
  import LegalizeService from '../services/legalisirList';
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'
  import errorServiceHandling from '../helper/error_service'
  import Cookies from 'js-cookie'

  let legalize = {}
  let alumniData = {}

  async function legalizeGetCall(proto){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			},
		}

    return await new LegalizeService(deps, proto).legalizeGet()
	}

  onMount(async () => {
		try {
      const urlParams = new URLSearchParams(window.location.search);
      if(!urlParams.has('id')) {
        navigate(PATH_URL.ADMIN_E_LEGALISIR, { replace: true })
      }
      const legalizeProto = new Legalize()
      legalizeProto.setId(urlParams.get('id'))
			const legalizeResp = await legalizeGetCall(legalizeProto);
      legalize = legalizeResp.toObject();
      alumniData = legalize.alumni;
      console.log('ALUMNI = ', legalizeResp.toObject());
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
	})
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
    <Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN}/>
    <main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
      <a use:link href={PATH_URL.ADMIN_E_LEGALISIR} class="flex items-center mb-8">
        <i class="mr-4 fas fa-arrow-left"></i>
        <p class="text-base">Kembali ke List Legalisir</p>
      </a>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
        <span class="block xl:inline">{alumniData ? alumniData.name : ''}</span>
      </h1>
      <div class="flex items-center mb-8">
        
      </div>
    </main>
  </div>
</div>