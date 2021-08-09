<script>
	import Sidebar from "../components/Sidebar.svelte";
	import Upload from "../components/Upload.svelte";
	import { notifications } from "../helper/toast";
	import { HOST_URL, APP_ENV } from '../env'
	import Cookies from 'js-cookie'
  import { Legalize } from '../../proto/legalize_message_pb'
  import { EmptyMessage, StringMessage, UintMessage } from '../../proto/generic_message_pb'
  import LegalizeService from '../services/legalize'
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { SIDEBAR_USER } from '../helper/path'
  import { onMount } from 'svelte'
  import errorServiceHandling from '../helper/error_service'
  import { PATH_URL } from '../helper/path'

  let myLegalize = new Legalize()
  let stringMessage = new StringMessage()
  let uintMessage = new UintMessage()
  let hideRate = false

  const fileUpload = {
    ijazah: null,
    transcript: null
  }

  const filePath = {
    ijazah: null,
    transcript: null
  }

  const state = {
		isLoadingIjazah: false,
		isLoadingTranskrip: false
	}

	const changeFile = (event) => {
    const id = event.currentTarget.id 
    fileUpload[id] = document.getElementById(id) 
		uploadSimpleFile(fileUpload[id].files[0], id)
	}

	const uploadSimpleFile = async (e) => {
    const { acceptedFiles, name } = e.detail;
		const field = name === 'ijazah' ? 'isLoadingIjazah' : 'isLoadingTranskrip';
		// add file to FormData object
		const fd = new FormData();
		fd.append('file', acceptedFiles[0]);
    fd.append('module', name);
    state[field] = true;
		// send `POST` request
    try {
      const uploadedFile = await fetch(`${HOST_URL}/upload`, {
          method: 'POST',
          headers: {
            "token": Cookies.get('token')
          },
          body: fd
      })
      .then(res => res.json())
      filePath[name] = uploadedFile.path;
      state[field] = false;
    } catch(e) {
      state[field] = false;
    }
	}

  const onDeleteFile = async (e) => {
    const { name } = e.detail;
		filePath[name] = null
	}

  async function legalizeCreateCall(){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalizeProto = new Legalize()
    legalizeProto.setIjazah(filePath['ijazah'])
    legalizeProto.setTranscript(filePath['transcript'])
    
    const legalizeService = new LegalizeService(deps, legalizeProto)
    return await legalizeService.create()
	}

  const legalisir = async () => {
    try {
      if (!filePath['ijazah']) {
        throw {'message': 'pilih file ijazah terlebih dahulu'}
      }

      if (!filePath['transcript']) {
        throw {'message': 'pilih file transcript terlebih dahulu'}
      }

      myLegalize = await legalizeCreateCall()
      if (myLegalize.getId()) {
        notifications.success('e-legalisir telah disubmit')
      }
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
  }

  async function myLegalizeCall() {
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalizeService = new LegalizeService(deps, new EmptyMessage())
    return await legalizeService.getOwn() 
  }

  async function myLegalizeRate() {
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}
    console.log(uintMessage.getData())
    const legalizeService = new LegalizeService(deps, uintMessage)
    return await legalizeService.rating() 
  }

  onMount(async () => {
		try {
      myLegalize = await myLegalizeCall()
      console.log(myLegalize)
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
	})

  const changeRating = (event) => {
    uintMessage.setData(event.currentTarget.value)
  }

  const sendRating = async() => {
    try {
      stringMessage = await myLegalizeRate()
      notifications.success(stringMessage.getData(), 3000)
      hideRate = true
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
  }
</script>

<!-- div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
			<input on:change="{changeFile}" type="file" id="ijazah">
      <input on:change="{changeFile}" type="file" id="transcript">
      <button on:click="{legalisir}">Upload</button>

	</div>
</div -->

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="e-legalisir" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">E-Legalisir</h1>
      {#if  myLegalize.getId()}
        <p class="text-xl text-gray-500">Anda telah mengajukan e-legalisir dengan status saat ini:</p>
        {#if myLegalize.getStatus() === 0}
          <div class="my-8">
            <p class="mb-4 text-4xl font-semibold text-red-500">DITOLAK</p>
            <p class="w-3/4 text-xl">Silahkan ajukan e-legalisir ulang, atau hubungi admin untuk info lebih lanjut</p>
          </div>
        {:else if myLegalize.getStatus() === 1}
          <div class="my-8">
            <p class="my-4 text-4xl font-semibold text-yellow-700">SUBMITTED</p>
            <p class="w-3/4 text-xl">Dokumen sedang dalam proses pengecekan, mohon menunggu proses verifikasi</p>
          </div>
        {:else if myLegalize.getStatus() === 2}
          <div class="my-8">
            <p class="my-4 text-4xl font-semibold text-blue-500">DIVERIFIKASI</p>
            <p class="w-3/4 text-xl">Dokumen sedang dalam tahap verifikasi, mohon menunggu proses tanda tangan dokumen</p>
          </div>
          {:else if myLegalize.getStatus() === 3}
          <div class="my-8">
            <p class="my-4 text-4xl font-semibold text-green-700">DISETUJUI</p>
            <p class="w-3/4 text-xl">Dokumen telah diverifikasi dan disetujui, silahkan untuk mengunduh dokumen ijazah atau transkrip nilai yang sudah disetujui melalui tombol dibawah ini</p>
          </div>

          <div class="flex">
            <a href="{myLegalize.getIjazahSigned()}" class="flex items-center justify-center px-6 py-2 mr-4 text-base font-medium text-green-900 border border-transparent rounded-md bg-green-50 w-max-full hover:bg-white hover:border-green-300 md:text-lg">
              <i class="mr-4 fas fa-download"></i>
              Download Legalisir Ijazah
            </a>

            <a href="{myLegalize.getTranscriptSigned()}" class="flex items-center justify-center px-6 py-2 text-base font-medium text-green-900 border border-transparent rounded-md bg-green-50 w-max-full hover:bg-white hover:border-green-300 md:text-lg ">
              <i class="mr-4 fas fa-download"></i>
              Download Legalisir Transkrip
            </a> 
          </div>
          
          {#if !myLegalize.getRating() && !hideRate}
            <hr class="my-12 md:min-w-full" />
            
            <div id="formRating">
              <p class="mb-6 text-xl text-gray-500">Apakah anda puas dengan pelayanan e legalisir online?</p>
              <select on:blur="{changeRating}" id="country" name="country" autocomplete="country" class="px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm w-96 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg">
                <option value="" disabled selected>Pilih Tingkat Kepuasan</option>
                <option value="5">sangat puas</option>
                <option value="4">puas</option>
                <option value="3">cukup puas</option>
                <option value="2">tidak puas</option>
                <option value="1">sangat tidak puas</option>
              </select>
              <button on:click="{sendRating}" type="button" class="px-6 py-2 ml-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500">
                Kirim penilaian
              </button>
            </div>
          {/if}
        {/if}
      {/if}

      {#if !myLegalize.getId() || myLegalize.getStatus() === 0 }

      <p class="w-3/4 mb-8 text-xl text-gray-500">Silahkan unggah dokumen yang diperlukan berupa ijazah dan transkrip nilai Anda untuk dapat kami proses</p>

			<div class="mb-12">
				<label for="ijazah" class="block mb-4 text-base font-medium text-gray-700">
					Upload ijazah
				</label>
				<Upload
          on:drop={uploadSimpleFile}
          on:delete={onDeleteFile}
          name="ijazah"
          id="ijazah"
          isLoading={state.isLoadingIjazah}
          file={filePath.ijazah}
        />
			</div>

			<div class="mb-12">
				<label for="transcript" class="block mb-4 text-base font-medium text-gray-700">
					Upload transkrip nilai
				</label>
				<Upload
          on:drop={uploadSimpleFile}
          on:delete={onDeleteFile}
          name="transcript"
          id="transcript"
          isLoading={state.isLoadingTranskrip}
          file={filePath.transcript}
        />
			</div>
			<div class="px-4 py-3 mt-10 text-right bg-gray-50 sm:px-6">
        <button on:click={legalisir} class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Legalisir
        </button>
      </div>
      {/if}
		</main>

	</div>
</div>