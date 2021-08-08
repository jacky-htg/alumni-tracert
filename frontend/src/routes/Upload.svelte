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
        Anda telah mengajukan e-legalisir dengan status :
        {#if myLegalize.getStatus() === 0}
          <h2>DITOLAK</h2>
          <p>Silahkan ajukan e-legalisir ulang, atau hubungi admin untuk info lebih lanjut</p>
        {:else if myLegalize.getStatus() === 1}
          <h2>SUBMIT</h2>
          <p>Mohon menunggu proses verifikasi</p>
        {:else if myLegalize.getStatus() === 2}
          <h2>DIVERIFIKASI</h2>
          <p>Mohon menunggu proses tanda tangan</p>
        {:else if myLegalize.getStatus() === 3}
          <h2>DISETUJUI</h2>
          <a href="{myLegalize.getIjazahSigned()}">Download Ijazah</a> | <a href="{myLegalize.getTranscriptSigned()}">Download Transcript</a> 
          {#if !myLegalize.getRating() && !hideRate}
            <hr/>
            <div id="formRating">
              <h3>Apakah anda puas dengan pelayanan e legalisir online?</h3>
              <select on:blur="{changeRating}">
                <option value="" disabled selected>Pilih Tingkat Kepuasan</option>
                <option value="5">sangat puas</option>
                <option value="4">puas</option>
                <option value="3">cukup puas</option>
                <option value="2">tidak puas</option>
                <option value="1">sangat tidak puas</option>
              </select>
              <button on:click="{sendRating}">Send</button>
            </div>
          {/if}
        {/if}
      {/if}

      {#if !myLegalize.getId() || myLegalize.getStatus() === 0 }

			<div class="mb-12">
				<label for="ijazah" class="block text-sm font-medium text-gray-700">
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
				<label for="transcript" class="block text-sm font-medium text-gray-700">
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
			<div class="mt-10 px-4 py-3 text-right bg-gray-50 sm:px-6">
        <button on:click={legalisir} class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Legalisir
        </button>
      </div>
      {/if}
		</main>

	</div>
</div>