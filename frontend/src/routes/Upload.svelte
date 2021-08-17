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
  let ijazahList = []

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

	const uploadSimpleFile = async (e, idx) => {
    const { acceptedFiles, name } = e.detail;
		const field = name === 'ijazah' ? 'isLoadingIjazah' : 'isLoadingTranskrip';
		// add file to FormData object
		const fd = new FormData();
		fd.append('file', acceptedFiles[0]);
    fd.append('module', name);
    ijazahList[idx].legalize.state[field] = true;
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
      ijazahList[idx].legalize.filePath[name] = uploadedFile.path;
      ijazahList[idx].legalize.state[field] = false;
    } catch(e) {
      ijazahList[idx].legalize.state[field] = false;
    }
	}

  const onDeleteFile = async (e, idx) => {
    const { name } = e.detail;
    ijazahList[idx].filePath[name] = null
	}

  async function legalizeCreateCall(idx){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalizeProto = new Legalize()
    legalizeProto.setCertificateId(ijazahList[idx].proto.getId())    
    legalizeProto.setIjazah(ijazahList[idx].legalize.filePath['ijazah'])
    legalizeProto.setTranscript(ijazahList[idx].legalize.filePath['transcript'])
    legalizeProto.setIsOffline(ijazahList[idx].legalize.isOffline)

    
    const legalizeService = new LegalizeService(deps, legalizeProto)
    return await legalizeService.create()
	}

  const legalisir = async (idx) => {
    try {
      if (!ijazahList[idx].legalize.filePath['ijazah']) {
        throw {'message': 'pilih file ijazah terlebih dahulu'}
      }

      if (!ijazahList[idx].legalize.filePath['transcript']) {
        throw {'message': 'pilih file transcript terlebih dahulu'}
      }

      console.log(`ijazahList`, ijazahList)

      myLegalize = await legalizeCreateCall(idx)
      if (myLegalize.getId()) {
        notifications.success('e-legalisir telah disubmit')
      }

      await getLegalize()

    } catch(e) {
      console.log(`e`, e)
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

  async function myLegalizeRate(idx) {
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}
    let legalizeProto = new Legalize()
    legalizeProto.setRating(ijazahList[idx].legalize.uintMessage.getData());
    legalizeProto.setId(ijazahList[idx].proto.getLegalize().getId());

    console.log(`legalizeProto`, legalizeProto)
    const legalizeService = new LegalizeService(deps, legalizeProto)
    return await legalizeService.rating() 
  }

  const getLegalize = async () => {
    myLegalize = await myLegalizeCall()
    console.log(myLegalize)
    console.log(`myLegalize.getCertificateList()`, myLegalize.getCertificateList())
    let tempIjazahList = [];
    myLegalize.getCertificateList().forEach(el => {
      let ijazahObj = {
        proto: el,
        legalize: {
          fileUpload: {
            ijazah: null,
            transcript: null
          },
          filePath: {
            ijazah: null,
            transcript: null
          },
          state: {
            isLoadingIjazah: false,
            isLoadingTranskrip: false
          },
          isOffline: false,
          uintMessage: new UintMessage(),
          hideRate: el.getLegalize().getRating() ? true : false
        }
      }
      tempIjazahList.push(ijazahObj)
    })
    ijazahList = tempIjazahList;
    console.log(`ijazahList`, ijazahList)
  }

  onMount(async () => {
		try {
      await getLegalize()
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
	})

  const changeRating = (event, idx) => {
    ijazahList[idx].legalize.uintMessage.setData(event.currentTarget.value)
  }

  const sendRating = async(idx) => {
    try {
      stringMessage = await myLegalizeRate(idx)
      notifications.success(stringMessage.getData(), 3000)
      ijazahList[idx].legalize.hideRate = true
    } catch(e) {
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
  }

  const changeIsOffline = (idx, value) => {
    let temp = ijazahList;
    temp[idx].legalize.isOffline = value === 'true' ? true : false;
    ijazahList = temp
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
      <p class="w-3/4 mb-4 text-xl text-gray-500">Anda memiliki <span class='text-black'>{ijazahList.length}</span> ijazah yang telah didaftarkan</p>
      {#if ijazahList.length > 0}
      <p class="w-3/4 mb-8 text-xl text-gray-500">Silahkan unggah dokumen yang diperlukan berupa ijazah dan transkrip nilai Anda untuk dapat kami proses</p>
      {/if}

      <div class="ijazah-wrapper">
        {#each ijazahList as ijazah, idx}
          <div class="izajah-card relative rounded-md bg-white shadow p-6 mb-6">
            <p class="w-3/4 text-m text-gray-500">
              Jurusan: 
              <span class="font-bold text-black">
                {ijazah.proto.getMajorStudy()}
              </span>
            </p>
            <p class="w-3/4 text-m text-gray-500">
              Tahun Kelulusan: 
              <span class="font-bold text-black">
                {ijazah.proto.getGraduationYear()}
              </span>
            </p>
            <p class="w-3/4 text-m text-gray-500">
              NIM: 
              <span class="font-bold text-black">
                {ijazah.proto.getNim()}
              </span>
            </p>
            <p class="w-3/4 mb-8 text-m text-gray-500">
              No. Ijazah: 
              <span class="font-bold text-black">
                {ijazah.proto.getNoIjazah()}
              </span>
            </p>
            {#if ijazah.proto.getLegalize().getStatus()}
            <p class="absolute top-6 right-6 text-m text-gray-500">
              Jenis Legalisir: 
              <span class="font-bold text-black">
                {ijazah.proto.getLegalize().getIsOffline() ? 'Legalisir Cap Basah' : 'E-Legalisir'}
              </span>
            </p>
            {/if}
            
            {#if  ijazah.proto.getLegalize().getId()}
              <p class="text-xl text-gray-500">Anda telah mengajukan {ijazah.proto.getLegalize().getIsOffline() ? 'Legalisir Cap Basah' : ' E-legalisir '} dengan status saat ini:</p>
              {#if ijazah.proto.getLegalize().getStatus() === 0}
                <div class="my-8">
                  <p class="mb-4 text-4xl font-semibold text-red-500">DITOLAK</p>
                  <p class="w-3/4 text-xl">Silahkan ajukan e-legalisir ulang, atau hubungi admin untuk info lebih lanjut</p>
                </div>
              {:else if ijazah.proto.getLegalize().getStatus() === 1}
                <div class="my-8">
                  <p class="my-4 text-4xl font-semibold text-yellow-700">SUBMITTED</p>
                  <p class="w-3/4 text-xl">Dokumen sedang dalam proses pengecekan, mohon menunggu proses verifikasi</p>
                </div>
              {:else if ijazah.proto.getLegalize().getStatus() === 2}
                <div class="my-8">
                  <p class="my-4 text-4xl font-semibold text-blue-500">DIVERIFIKASI</p>
                  <p class="w-3/4 text-xl">Dokumen sedang dalam tahap verifikasi, mohon menunggu proses tanda tangan dokumen</p>
                </div>
                {:else if ijazah.proto.getLegalize().getStatus() === 3}
                <div class="my-8">
                  <p class="my-4 text-4xl font-semibold text-green-700">DISETUJUI</p>
                  {#if ijazah.proto.getLegalize().getIsOffline()}
                    <p class="w-3/4 text-xl">Dokumen telah diverifikasi dan disetujui, silahkan untuk mengambil dokumen ijazah atau transkrip nilai yang sudah disetujui di kampus</p>
                  {:else}
                    <p class="w-3/4 text-xl">Dokumen telah diverifikasi dan disetujui, silahkan untuk mengunduh dokumen ijazah atau transkrip nilai yang sudah disetujui melalui tombol dibawah ini</p>
                  {/if}
                </div>

                {#if !ijazah.proto.getLegalize().getIsOffline()}
                <div class="flex">
                  <a href="{ijazah.proto.getLegalize().getIjazahSigned()}" class="flex items-center justify-center px-6 py-2 mr-4 text-base font-medium text-green-900 border border-transparent rounded-md bg-green-50 w-max-full hover:bg-white hover:border-green-300 md:text-lg">
                    <i class="mr-4 fas fa-download"></i>
                    Download Legalisir Ijazah
                  </a>

                  <a href="{ijazah.proto.getLegalize().getTranscriptSigned()}" class="flex items-center justify-center px-6 py-2 text-base font-medium text-green-900 border border-transparent rounded-md bg-green-50 w-max-full hover:bg-white hover:border-green-300 md:text-lg ">
                    <i class="mr-4 fas fa-download"></i>
                    Download Legalisir Transkrip
                  </a> 
                </div>
                {/if}
            
                {#if !ijazah.proto.getLegalize().getRating() && !ijazah.legalize.hideRate}
                  <hr class="my-12 md:min-w-full" />
              
                  <div id="formRating">
                    <p class="mb-6 text-xl text-gray-500">Apakah anda puas dengan pelayanan legalisir online?</p>
                    <select on:blur="{e => changeRating(e, idx)}" id="country" name="country" autocomplete="country" class="px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm w-96 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg">
                      <option value="" disabled selected>Pilih Tingkat Kepuasan</option>
                      <option value={5}>Sangat puas</option>
                      <option value={4}>Puas</option>
                      <option value={3}>Cukup puas</option>
                      <option value={2}>Tidak puas</option>
                      <option value={1}>Sangat tidak puas</option>
                    </select>
                    <button on:click="{() => sendRating(idx)}" type="button" class="px-6 py-2 ml-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500">
                      Kirim penilaian
                    </button>
                  </div>
                {/if}
              {/if}
            {/if}

            {#if !ijazah.proto.getLegalize().getId() || ijazah.proto.getLegalize().getStatus() === 0 }
            
            <div class="flex justify-around items-center">
              <div class="mb-12 w-2/5">
                <label for="ijazah" class="block mb-4 text-base font-medium text-gray-700">
                  Upload ijazah
                </label>
                <Upload
                  on:drop={e => uploadSimpleFile(e, idx)}
                  on:delete={e => onDeleteFile(e, idx)}
                  name="ijazah"
                  id="ijazah"
                  isLoading={ijazahList[idx].legalize.state.isLoadingIjazah}
                  file={ijazahList[idx].legalize.filePath.ijazah}
                />
              </div>
  
              <div class="mb-12 w-2/5">
                <label for="transcript" class="block mb-4 text-base font-medium text-gray-700">
                  Upload transkrip nilai
                </label>
                <Upload
                  on:drop={e => uploadSimpleFile(e, idx)}
                  on:delete={e => onDeleteFile(e, idx)}
                  name="transcript"
                  id="transcript"
                  isLoading={ijazahList[idx].legalize.state.isLoadingTranskrip}
                  file={ijazahList[idx].legalize.filePath.transcript}
                />
              </div>
              
            </div>
            <div class="px-4 py-3 mt-10 text-left flex justify-between bg-gray-50 sm:px-6">
              <div class="flex items-center">
                <p class='mr-6'>Jenis Legalisir:</p>
                <div class="flex items-center mr-4">
                  <input checked={ ijazah.legalize.isOffline === false} on:change="{(event) => changeIsOffline(idx, event.target.value)}" id={`radio-online`} name={`radio-isOnline-${idx}`} type="radio" value="{false}" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                  <div class="flex items-center w-full">
                    <label data-tooltip={'Download file legalisir'} for={`radio-online`} class="block max-w-xl ml-2 text-sm font-medium text-gray-700 cursor-pointer w-max min-w-max">
                      E-Legalisir
                    </label>
                  </div>
                </div>
                <div class="flex items-center">
                  <input checked={ ijazah.legalize.isOffline === true} on:change="{(event) => changeIsOffline(idx, event.target.value)}" id={`radio-offline`} name={`radio-isOnline-${idx}`} type="radio" value="{true}" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                  <div class="flex items-center w-full">
                    <label data-tooltip={'Ambil legalisir cap basah'} for={`radio-offline`} class="block max-w-xl ml-2 text-sm font-medium text-gray-700 cursor-pointer w-max min-w-max">
                      Legalisir Cap Basah
                    </label>
                  </div>
                </div>
              </div>
              <button on:click={() => legalisir(idx)} class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Legalisir
              </button>
            </div>
            {/if}
          </div>
        {/each}
      </div>
		</main>

	</div>
</div>

<svelte:head>
<style>
/*This would all go into the global.css file*/
  [data-tooltip] {
  position: relative;
  z-index: 2;
  display: block;
}

[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: .2s ease-out;
  transform: translate(-50%, 5px)
}

[data-tooltip]:before {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-bottom: 5px;
  padding: 7px;
  width: auto;
  white-space: nowrap;
  min-width: 70px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  transition: .2s ease-out
}

[data-tooltip]:after {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
  transform: translate(-50%, 0)
}
[data-tooltip=false]:hover:before,
[data-tooltip=false]:hover:after {
  visibility: hidden;
  opacity: 0;
}
</style>
</svelte:head>