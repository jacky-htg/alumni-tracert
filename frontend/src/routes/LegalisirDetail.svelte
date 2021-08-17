<script>
  import { link } from 'svelte-routing'
  import Sidebar from "../components/Sidebar.svelte";
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { navigate } from 'svelte-routing'
  import { Legalize } from '../../proto/legalize_message_pb'
  import { Alumni } from '../../proto/alumni_message_pb'
  import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
  import LegalizeService from '../services/legalisirList';
  import AlumniService from '../services/alumni';
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'
  import errorServiceHandling from '../helper/error_service'
  import Cookies from 'js-cookie'
  import Button from '../components/Button.svelte'
  import Loader from '../components/Loader.svelte'
  import moment from 'moment'
  
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
  async function alumniCall(proto){
    const alumni = new AlumniService(deps, proto)
    return await alumni.get()
	}
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get('id') || "";
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
      const alumniProto = new Alumni();
      alumniProto.setId(legalize.alumniId);
      let alumniProtoresp = await alumniCall(alumniProto);
      alumniData = alumniProtoresp.toObject();
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

  const onDone = async (id) => {
		try {
			isLoadingApproved = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.done()
			isLoadingApproved = false;
		} catch(e) {
			isLoadingApproved = false;
			onError(e)
		}
	}

  const onDownloadIjazah = () => {
    const signedUrl = legalizeProtoResp.getIjazah();
    window.open(signedUrl,'_blank');
  }

  const onDownloadTranskrip = () => {
    const signedUrl = legalizeProtoResp.getTranscript();
    window.open(signedUrl,'_blank');
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
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
            <span class="block xl:inline">{alumniData.name}</span>
          </h1>
          <p class="text-sm text-blue-400">{alumniData.phone}</p>
        </div>
        <div>
          {#if legalize.status != 3}
            <div class="flex align-center">
              {#if usertype != "4"}
                {#if legalize.status === 1}
                  <Button isLoading={isLoadingReject} on:click={onReject} className="mr-2" bgColor="bg-red-500" bgHoverColor="bg-red-400">Reject</Button>
                  <Button isLoading={isLoadingAccept} on:click={onAccept} className="mr-2" bgColor="bg-green-500" bgHoverColor="bg-green-400">Verify</Button>
                {:else}
                  <Button isLoading={isLoadingApproved} on:click={onDone} className="mr-2" bgColor="bg-yellow-300" bgHoverColor="bg-yellow-200">Done</Button>
                {/if}
              {:else if usertype == "4" && legalize.status === 2}
                <Button isLoading={isLoadingApproved} on:click={onApprove} className="mr-2" bgColor="bg-yellow-300" bgHoverColor="bg-yellow-200">Approve</Button>
              {/if}
            </div>
          {/if}
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div
            class="flex justify-center px-6 pt-5 pb-6 mt-1"
          >
            <div on:click={onDownloadIjazah} class="space-y-1 text-center cursor-pointer">
              <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <p class="mt-1">lihat ijazah</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex justify-center px-6 pt-5 pb-6 mt-1"
          >
            <div on:click={onDownloadTranskrip} class="space-y-1 text-center cursor-pointer">
              <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <p class="mt-1">lihat transkrip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-4 mt-6 pt-4 border-t-2 border-gray-300">
        <div>
          <h3 class="text-md font-bold mt-2">NIK</h3>
          <h3 class="text-md font-bold mt-2">Pengambilan</h3>
          {#if legalize.verifiedAt}
          <h3 class="text-md font-bold mt-2">Di Verifikasi Pada</h3>
          {/if}
        </div>
        <div class="col-span-5">
          <p class="text-md text-gray-900 mt-2">{`: ${alumniData.nik}`}</p>
          {#if legalize.isOffline}
          <p class="text-md text-gray-900 mt-2">{`: Offline`}</p>
          {:else}
          <p class="text-md text-gray-900 mt-2">{`: Online`}</p>
          {/if}
          {#if legalize.verifiedAt}
          <p class="text-md text-gray-900 mt-2">{`: ${moment(alumniData.verifiedAt).format('DD/MM/YYYY')}`}</p>
          {/if}
        </div>
      </div>
      {/if}
    </main>
  </div>
</div>