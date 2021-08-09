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
  import Button from '../components/Button.svelte'
  import Loader from '../components/Loader.svelte'
  
  let isLoadingPage = false;
  let legalize = {}
  let legalizeProtoResp = new Legalize();
  let alumniData = {}

  var deps = {
    proto: {
      TracertClient: TracertServicePromiseClient
    },
  }

  async function legalizeGetCall(proto){
    return await new LegalizeService(deps, proto).legalizeGet()
	}
  const urlParams = new URLSearchParams(window.location.search);
  let id = Number(urlParams.get('id') || 0);
  const usertype = Cookies.get('usertype');
  onMount(async () => {
		try {
      if(!urlParams.has('id')) {
        navigate(PATH_URL.ADMIN_E_LEGALISIR, { replace: true })
      }
      isLoadingPage = true;
      const legalizeProto = new Legalize()
      legalizeProto.setId(id)
			legalizeProtoResp = await legalizeGetCall(legalizeProto);
      legalize = legalizeProtoResp.toObject();
      alumniData = legalize.alumni;
      console.log('ALUMNI = ', legalizeProtoResp.toObject());
      isLoadingPage = false;
    } catch(e) {
      errorServiceHandling(e)
      isLoadingPage = false;
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
	})

  let isLoadingReject = false;
	let isLoadingAccept = false;
	let isLoadingApproved = false;

	const onReject = async () => {
		try {
			isLoadingReject = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.reject()
			isLoadingReject = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingReject = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}

	const onAccept = async () => {
		try {
			isLoadingAccept = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.verify() 
			isLoadingAccept = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingAccept = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}

	const onApprove = async () => {
		try {
			isLoadingApproved = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.approve()
			isLoadingApproved = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingApproved = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
    <Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN} pathImage="../" />
    <main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
      <a use:link href={PATH_URL.ADMIN_E_LEGALISIR} class="flex items-center mb-8">
        <i class="mr-4 fas fa-arrow-left"></i>
        <p class="text-base">Kembali ke List Legalisir</p>
      </a>
      {#if isLoadingPage}
      <div class="flex w-full h-full justify-center items-center">
        <Loader color="#047857"/>
      </div>
      {:else}
      <div class="flex align-center justify-between my-4 py-2 border-b-2 border-gray-300">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
          <span class="block xl:inline">{alumniData.name}</span>
        </h1>
        {#if legalize.status === 2 || legalize.status === 1}
          <div class="flex align-center">
            <Button isLoading={isLoadingReject} on:click={onReject} className="mr-2" bgColor="bg-red-500" bgHoverColor="bg-red-400">Reject</Button>
            <Button isLoading={isLoadingAccept} on:click={onAccept} className="mr-2" bgColor="bg-green-500" bgHoverColor="bg-green-400">Verify</Button>
            {#if usertype == "4"}
              <Button isLoading={isLoadingAccept} on:click={onApprove} className="mr-2" bgColor="bg-yellow-300" bgHoverColor="bg-yellow-200">Approve</Button>
            {/if}
          </div>
        {/if}
      </div>
      <p class="text-sm text-blue-400">{alumniData.phone}</p>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div
            class="flex justify-center px-6 pt-5 pb-6 mt-1"
          >
            <div class="space-y-1 text-center">
              <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <a href="{legalizeProtoResp.getIjazahSigned()}" class="mt-1">download ijazah</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex justify-center px-6 pt-5 pb-6 mt-1"
          >
            <div class="space-y-1 text-center">
              <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <a href="{legalizeProtoResp.getIjazahSigned()}" class="mt-1">download transkrip</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-4 mt-6 pt-4 border-t-2 border-gray-300">
        <div>
          <h3 class="text-md font-bold">NIK</h3>
          <h3 class="text-md font-bold">NIM</h3> 
          <h3 class="text-md font-bold">Phone</h3> 
          <h3 class="text-md font-bold">Lulus</h3>
        </div>
        <div class="col-span-5">
          <p class="text-md text-gray-900">{`: ${alumniData.nik}`}</p>
          <p class="text-md text-gray-900">{`: ${alumniData.nim}`}</p>
          <p class="text-md text-gray-900">{`: ${alumniData.phone}`}</p>
          <p class="text-md text-gray-900">{`: ${alumniData.graduationYear}`}</p>
        </div>
      </div>
      {/if}
    </main>
  </div>
</div>