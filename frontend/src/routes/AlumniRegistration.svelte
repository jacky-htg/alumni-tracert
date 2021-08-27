<script>
  import KuisionerNoOpening from '../components/KuisionerNoOpening.svelte'
  import { Alumni } from "../../proto/alumni_message_pb"
	import { User, AlumniRegistrationInput } from "../../proto/user_message_pb"
  import { Certificate } from '../../proto/certificate_message_pb'
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import alumniService from '../services/alumni'
  import { notifications } from '../helper/toast'
  import { PATH_URL } from '../helper/path'
  import { navigate } from 'svelte-routing'
  import Cookies from 'js-cookie'
  import Yearpicker from '../components/Yearpicker.svelte';

  const userProto = new User()
  const alumniProto = new Alumni()
  const alumniRegistrationProto = new AlumniRegistrationInput()
  const certificateProto = new Certificate()
    
  const changeName = (event) => {
    alumniProto.setName(event.currentTarget.value)
    userProto.setName(event.currentTarget.value)
  }

  const changeNim = (event) => {
    certificateProto.setNim(event.currentTarget.value)
  }

  const changeNik = (event) => {
    alumniProto.setNik(event.currentTarget.value)
  }

  const changeCity = (event) => {
    alumniProto.setPlaceOfBirth(event.currentTarget.value)
  }

  const changeBod = (event) => {
    alumniProto.setDateOfBirth(event.currentTarget.value)
  }

  const changeJurusan = (event) => {
    certificateProto.setMajorStudy(event.currentTarget.value)
  }

  const changeEntryYear = (event) => {
    certificateProto.setEntryYear(event.currentTarget.value)
  }

  const changeGraduationYear = (event) => {
    certificateProto.setGraduationYear(event.currentTarget.value)
  }

  const changeNoIjazah = (event) => {
    certificateProto.setNoIjazah(event.currentTarget.value)
  }

  const changePhone = (event) => {
    alumniProto.setPhone(event.currentTarget.value)
  }

  const changeEmail = (event) => {
    userProto.setEmail(event.currentTarget.value)
  }

  async function alumniRegistrationCall(){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    userProto.setUserType(1) // 1 = alumni
    alumniRegistrationProto.setUser(userProto)
    alumniRegistrationProto.setAlumni(alumniProto)
    alumniRegistrationProto.setCertificate(certificateProto)
    
		const alumni = new alumniService(deps, alumniRegistrationProto)
    return await alumni.registration()
	}

  const lanjutkan = async () => {
    try {
      const registration = await alumniRegistrationCall()
      Cookies.set('token', registration.getUser().getToken())
      Cookies.set('usertype', registration.getUser().getUserType())
      Cookies.set('userid', registration.getUser().getId())
      Cookies.set('username', registration.getUser().getName())

      navigate(PATH_URL.KUISIONER_FORM, { replace: true })
      
    } catch(e) {
      notifications.danger(e.message)
    }
  };

  const entryYears = [];
  const today = new Date();
  for (let i =  2013; i <= (today.getFullYear()-4); i++) {
    entryYears.push(i);
  }

  const graduationYears = [];
  for (let i =  2016; i <= (today.getFullYear()-1); i++) {
    graduationYears.push(i);
  }
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        
        <KuisionerNoOpening/>
        
        <Yearpicker />

        <h2 class="mb-8 text-xl font-semibold text-black">IDENTITAS ALUMNI</h2>
          <div class="overflow-hidden">

            <div class="grid grid-cols-4 gap-4 mb-8">
              <div class="col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700">NAMA</label>
                <input on:change="{changeName}" type="text" name="name" id="name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="nim" class="block text-sm font-medium text-gray-700">NIM</label>
                <input on:change="{changeNim}" type="text" name="nim" id="nim" autocomplete="nim" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="nik" class="block text-sm font-medium text-gray-700">NIK</label>
                <input on:change="{changeNik}" type="text" name="nik" id="nik" autocomplete="nikemail" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-2">
                <label for="city" class="block text-sm font-medium text-gray-700">TEMPAT LAHIR</label>
                <input on:change="{changeCity}" type="text" name="city" id="city" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="bod" class="block text-sm font-medium text-gray-700">TANGGAL LAHIR</label>
                <input on:change="{changeBod}" type="date" name="bod" id="bod" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="jurusan" class="block text-sm font-medium text-gray-700">JURUSAN/PRODI</label>
                <select on:blur="{changeJurusan}" id="jurusan" name="jurusan" autocomplete="jurusan" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
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
                <label for="entry-year" class="block text-sm font-medium text-gray-700">TAHUN MASUK</label>
                <select on:blur="{changeEntryYear}" id="entry-year" name="entry-year" autocomplete="entry-year" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option value="" disabled selected>Tahun Masuk</option>
                  {#each entryYears as year }
                  <option>{year}</option>
                  {/each}
                </select>
              </div>

              <div class="col-span-1">
                <label for="graduation-year" class="block text-sm font-medium text-gray-700">TAHUN LULUS</label>
                <select on:blur="{changeGraduationYear}" id="graduation-year" name="graduation-year" autocomplete="graduation-year" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option value="" disabled selected>Tahun Lulus</option>
                  {#each graduationYears as year }
                  <option>{year}</option>
                  {/each}
                </select>
              </div>

              <div class="col-span-4">
                <label for="no-ijazah" class="block text-sm font-medium text-gray-700">NOMOR IJAZAH</label>
                <input on:change="{changeNoIjazah}" type="text" name="no-ijazah" id="no-ijazah" autocomplete="no-ijazah" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">NOMOR TELP/WA</label>
                <input on:change="{changePhone}" type="text" name="phone" id="phone" autocomplete="phone" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">EMAIL</label>
                <input on:change="{changeEmail}" type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>
              
              
            </div>
            
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button on:click="{lanjutkan}" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Lanjutkan
              </button>
            </div>
          </div>

      </div>
    </main>

  </div>
</div>