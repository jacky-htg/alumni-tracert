<script>
	import Sidebar from "../components/Sidebar.svelte";
	import { notifications } from "../helper/toast";
	import { Certificate } from '../../proto/certificate_message_pb'
	import CertificateService from '../services/certificate'
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
	import { SIDEBAR_USER } from '../helper/path'
	import errorServiceHandling from '../helper/error_service'
	import { PATH_URL } from '../helper/path'
	import { navigate } from 'svelte-routing'
	import Yearpicker from '../components/Yearpicker.svelte'


	const certificateProto = new Certificate();
	
	const onChange = event => {

		switch (event.target.name) {
			case 'nim':
				certificateProto.setNim(event.currentTarget.value)
				break;
			case 'jurusan':
				certificateProto.setMajorStudy(event.currentTarget.value)
				break;
			case 'no-ijazah':
				certificateProto.setNoIjazah(event.currentTarget.value)
				break;
			default:
				break;
		}
	}

	const changeEntryYear = event => {
		certificateProto.setEntryYear(event.detail.yearSelected)
	}

	const changeGraduationYear = event => {
		certificateProto.setGraduationYear(event.detail.yearSelected)
	}

	 async function createCertificateCall(){
		var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

		const certificate = new CertificateService(deps, certificateProto)
		return await certificate.create()
	}

	const tambah = async () => {
		try {
			const certificateResponse = await createCertificateCall()
			notifications.success('Berhasil menambahkan ijazah')
			navigate(PATH_URL.UPLOAD_IJAZAH, { replace: true })
		} catch (e) {
			console.log(`e`, e)
			errorServiceHandling(e)
			notifications.danger(e.message)
		}
	}

</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="tambah-ijazah" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">Tambah Ijazah</h1>
			<p class="w-3/4 mb-8 text-xl text-gray-500">Tambahkan informasi ijazah milik anda yang belum teregister di E-legalisir</p>

			<div class="overflow-hidden">

				<div class="grid grid-cols-4 gap-4 mb-8">
					<div class="col-span-4">
						<label for="name" class="block text-sm font-medium text-gray-700">NIM</label>
						<input on:change="{onChange}" type="text" name="nim" id="name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
					</div>

					<div class="col-span-2">
						<label for="jurusan" class="block text-sm font-medium text-gray-700">Jurusan/Prodi</label>
						<select on:blur="{onChange}" id="jurusan" name="jurusan" autocomplete="jurusan" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
							<option value="" disabled selected>Pilih Jurusan</option>
							<option>Jurusan Analisis Kesehatan/TLM</option>
							<option>Jurusan Farmasi</option>
							<option>Prodi D4 Gizi</option>
							<option>Prodi D3 Gizi</option>
							<option>Prodi D4 Keperawatan</option>
							<option>Prodi D3 Keperawatan Medan</option>
							<option>Jurusan Kesehatan Gigi</option>
							<option>Prodi D4 Sanitasi</option>
							<option>Prodi D3 Sanitasi</option>
							<option>Prodi D4 Kebidanan</option>
							<option>Prodi D3 Kebidanan Medan</option>
							<option>Prodi D3 Kebidanan P. Sidimpuan</option>
							<option>Prodi D3 Kebidanan P. Siantar</option>
							<option>Prodi D3 Kebidanan Tarutung</option>
							<option>Prodi D3 Kebidanan Karo</option>
							<option>Prodi D3 Keperawatan Gunung Sitoli</option>
							<option>Prodi D3 Keperawatan Dairi</option>
							<option>Prodi D3 Keperawatan Sibolga</option>
							<option>Prodi Profesi Bidan</option>
						</select>
					</div>

					<div class="col-span-1">
						<label for="entry-year" class="block text-sm font-medium text-gray-700">Tahun masuk</label>
						<Yearpicker on:yearSelected={changeEntryYear}/>
					</div>
					
					<div class="col-span-1">
						<label for="graduation-year" class="block text-sm font-medium text-gray-700">Tahun lulus</label>
						<Yearpicker on:yearSelected={changeGraduationYear}/>
					</div>

					<div class="col-span-4">
						<label for="no-ijazah" class="block text-sm font-medium text-gray-700">Nomor Ijazah</label>
						<input on:change="{onChange}" type="text" name="no-ijazah" id="no-ijazah" autocomplete="no-ijazah" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
					</div>              
              
				</div>
            
				<div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
					<button on:click="{tambah}" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Tambah
					</button>
				</div>
			</div>
			
		</main>

	</div>
</div>