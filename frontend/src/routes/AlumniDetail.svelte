<script>
  import { link } from 'svelte-routing'
  import Sidebar from "../components/Sidebar.svelte";
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { navigate } from 'svelte-routing'
  import { Alumni } from '../../proto/alumni_message_pb'
  import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
  import AlumniService from '../services/alumni';
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'
  import errorServiceHandling from '../helper/error_service'
  import Cookies from 'js-cookie'
  import moment from 'moment';

  let alumni = {}

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
      alumni = alumniResp.toObject();
      console.log('ALUMNI = ', alumniResp.toObject());
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
    <Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN} pathImage="../" />
    <main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
      <a use:link href={PATH_URL.ADMIN_ALUMNI} class="flex items-center mb-8">
        <i class="mr-4 fas fa-arrow-left"></i>
        <p class="text-base">Kembali ke List Alumni</p>
      </a>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
        <span class="block xl:inline">{alumni.name}</span>
      </h1>
      <p class="text-sm text-blue-400">{alumni.phone}</p>
      <div class="mt-4">
        <h3 class="text-lg font-bold">Study</h3>
        <p class="text-sm text-gray-900">{alumni.majorStudy}</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h3 class="text-lg font-bold">NIK</h3>
          <p class="text-sm text-gray-900">{alumni.nik}</p>
          <h3 class="text-lg font-bold mt-4">TTL</h3>
          <p class="text-sm text-gray-900">{`${alumni.placeOfBirth}`}</p>
          <p class="text-sm text-gray-900">{moment(alumni.dateOfBirth || moment()).format('DD/MM/YYYY')}</p>
        </div>
        <div>
          <h3 class="text-lg font-bold">NIM</h3>
          <p class="text-sm text-gray-900">{alumni.nim}</p>
          <h3 class="text-lg font-bold mt-4">Lulus</h3>
          <p class="text-sm text-gray-900">{alumni.graduationYear}</p>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-bold">No. Ijazah</h3>
        <p class="text-sm text-gray-900">{alumni.noIjazah}</p>
      </div>
    </main>
  </div>
</div>