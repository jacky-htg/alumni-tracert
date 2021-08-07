<script>
	import { token } from '../stores/token.js'
	import Sidebar from "../components/Sidebar.svelte";
	import Upload from "../components/Upload.svelte";
	import { notifications } from "../helper/toast";
	import { HOST_URL, APP_ENV } from '../env'
	import Cookies from 'js-cookie'
  import { Legalize } from '../../proto/legalize_message_pb'
  import LegalizeService from '../services/legalize'
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
	/*const state = {
		isLoadingIjazah: false,
		isLoadingTranskrip: false
	}
  const onUpload = async (e) => {
    const { acceptedFiles, name } = e.detail;
		const field = name === 'ijazah' ? 'isLoadingIjazah' : 'isLoadingTranskrip';
    state[field] = true;
    try {
      const response = await fetch(`${HOST_URL}/upload`, { // Your POST endpoint
        method: 'POST',
				mode: 'no-cors',
        headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          "token": Cookies.get('token')
        },
        body: acceptedFiles[0]
      }).then(
        response => response.json()
      );
      state[field] = false;
      console.log('RESPONSE = ', response);
    } catch(e) {
      state[field] = false;
      notifications.danger(e.message)
    }
  } */

  const fileUpload = {
    ijazah: null,
    transcript: null
  }

  const filePath = {
    ijazah: null,
    transcript: null
  }

	const changeFile = (event) => {
    const id = event.currentTarget.id 
    fileUpload[id] = document.getElementById(id) 
		uploadSimpleFile(fileUpload[id].files[0], id)
	}

	const uploadSimpleFile = (file, id) => {

		// add file to FormData object
		const fd = new FormData();
		fd.append('file', file);
    fd.append('module', id);

		// send `POST` request
		fetch(`${HOST_URL}/upload`, {
				method: 'POST',
        headers: {
          "token": Cookies.get('token')
        },
				body: fd
		})
		.then(res => res.json())
		.then(json => filePath[id] = json.path)
		.catch(err => console.error(err));
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

      const legalisirUpload = await legalizeCreateCall()
      console.log(legalisirUpload)
    } catch(e) {
      notifications.danger(e.message)
    }
  }
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
			<input on:change="{changeFile}" type="file" id="ijazah">
      <input on:change="{changeFile}" type="file" id="transcript">
      <button on:click="{legalisir}">Upload</button>

	</div>
</div>

<!-- div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar location={location}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">E-Legalisir</h1>

			<div class="mb-12">
				<label class="block text-sm font-medium text-gray-700">
					Upload ijazah
				</label>
				<Upload on:drop={onUpload} name="ijazah" isLoading={state.isLoadingIjazah}/>
			</div>

			<div class="mb-12">
				<label class="block text-sm font-medium text-gray-700">
					Upload transkrip nilai
				</label>
				<Upload on:drop={onUpload} name="transkrip" isLoading={state.isLoadingTranskrip}/>
			</div>
			
		</main>

	</div>
</div-->