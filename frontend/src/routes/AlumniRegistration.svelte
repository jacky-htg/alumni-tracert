<script>
  import KuisionerNoOpening from '../components/KuisionerNoOpening.svelte'
  import { Alumni } from "../../proto/alumni_message_pb"
	import { User, AlumniRegistrationInput } from "../../proto/user_message_pb"
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import alumniService from '../services/alumni'
  import { notifications } from '../helper/toast'
  import { token } from '../stores/token'
  import { userStore } from '../stores/user'
  import { Images } from '../helper/images'
  import { PATH_URL } from '../helper/path'
  import { navigate } from 'svelte-routing'
  import Cookies from 'js-cookie'

  const userProto = new User()
  const alumniProto = new Alumni()
  const alumniRegistrationProto = new AlumniRegistrationInput()
    
  const changeName = (event) => {
    alumniProto.setName(event.currentTarget.value)
    userProto.setName(event.currentTarget.value)
  }

  const changeNim = (event) => {
    alumniProto.setNim(event.currentTarget.value)
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
    alumniProto.setMajorStudy(event.currentTarget.value)
  }

  const changeGraduationYear = (event) => {
    alumniProto.setGraduationYear(event.currentTarget.value)
  }

  const changeNoIjazah = (event) => {
    alumniProto.setNoIjazah(event.currentTarget.value)
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
    
		const alumni = new alumniService(deps, alumniRegistrationProto)
    return await alumni.registration()
	}

  const lanjutkan = async () => {
    try {
      const registration = await alumniRegistrationCall()
      localStorage.setItem('token', registration.getUser().getToken())
      token.set(localStorage.getItem('token'))

      localStorage.setItem('user', JSON.stringify(registration.getUser()))
      userStore.set(localStorage.getItem('user'))

      Cookies.set('token', registration.getUser().getToken())
      Cookies.set('user', JSON.stringify(localStorage.getItem('user')))

      navigate(PATH_URL.KUISIONER_FORM, { replace: true })
      
    } catch(e) {
      console.log('masuk sini')
      notifications.danger(e.message)
    }
  };
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        
        <KuisionerNoOpening/>

        <h2 class="mb-8 text-xl font-semibold text-black">Data Alumni</h2>
          <div class="overflow-hidden">

            <div class="grid grid-cols-4 gap-4 mb-8">
              <div class="col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
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
                <label for="city" class="block text-sm font-medium text-gray-700">Tempat lahir</label>
                <input on:change="{changeCity}" type="text" name="city" id="city" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="bod" class="block text-sm font-medium text-gray-700">Tanggal kelahiran</label>
                <input on:change="{changeBod}" type="date" name="bod" id="bod" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="jurusan" class="block text-sm font-medium text-gray-700">Jurusan/Prodi</label>
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
                  <option>Prodi D3 Kebidanan Dairi</option>
                  <option>Prodi D3 Keperawatan Sibolga</option>
                  <option>Prodi Profesi Bidan</option>
                </select>
              </div>

              <div class="col-span-2">
                <label for="graduation-year" class="block text-sm font-medium text-gray-700">Tahun lulus</label>
                <select on:blur="{changeGraduationYear}" id="graduation-year" name="graduation-year" autocomplete="graduation-year" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option value="" disabled selected>Pilih Tahun Lulus</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                </select>
              </div>

              <div class="col-span-4">
                <label for="no-ijazah" class="block text-sm font-medium text-gray-700">Nomor Ijazah</label>
                <input on:change="{changeNoIjazah}" type="text" name="no-ijazah" id="no-ijazah" autocomplete="no-ijazah" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">Nomor telp./WhatsApp</label>
                <input on:change="{changePhone}" type="text" name="phone" id="phone" autocomplete="phone" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email</label>
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