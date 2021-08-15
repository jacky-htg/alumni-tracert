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
  import Loader from '../components/Loader.svelte'

  let alumni = {}
  let isLoadingPage = true;

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
      isLoadingPage = true;
      const urlParams = new URLSearchParams(window.location.search);
      if(!urlParams.has('id')) {
        navigate(PATH_URL.LIST_ALUMNI, { replace: true })
      }
      console.log(urlParams.get('id'));
      const alumniProto = new Alumni()
      alumniProto.setId(urlParams.get('id'))
			const alumniResp = await alumniListCall(alumniProto);
      alumni = alumniResp.toObject();
      isLoadingPage = false;
    } catch(e) {
      isLoadingPage = false;
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
      {#if isLoadingPage}
      <div class="flex w-full h-full justify-center items-center">
        <Loader color="#047857"/>
      </div>
      {:else}
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
        <span class="block xl:inline">{alumni.name}</span>
      </h1>
      <p class="text-sm text-blue-400">{alumni.phone}</p>
      <div class="mt-4">
        <h3 class="text-lg font-bold">NIK</h3>
        <p class="text-sm text-gray-900">{alumni.nik}</p>
      </div>
      <h3 class="text-lg font-bold mt-4">TTL</h3>
      <p class="text-sm text-gray-900">{`${alumni.placeOfBirth}`}</p>
      <p class="text-sm text-gray-900">{moment(alumni.dateOfBirth || moment()).format('DD/MM/YYYY')}</p>
      <div class="mt-4">
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-2xl">
          <span class="block xl:inline">Daftar Ijazah:</span>
        </h1>
        <div class="mt-4 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  No. Ijazah
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Studi
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  NIM
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each alumni.certificatesList as certificate}
              <tr class="legalisir-row">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {certificate.noIjazah}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{certificate.majorStudy}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{certificate.nim}</div>
                </td>
              </tr>
              {/each}
              <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
      {/if}
    </main>
  </div>
</div>