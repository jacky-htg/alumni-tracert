<script>
  import { onMount, afterUpdate } from 'svelte'
  import { navigate } from 'svelte-routing'
  import Cookies from 'js-cookie'
  import AutoComplete from "simple-svelte-autocomplete";

  import { token } from '../stores/token.js'
  import { Images } from '../helper/images'
  import { PATH_URL } from '../helper/path'
  import { notifications } from '../helper/toast'
  import errorServiceHandling from '../helper/error_service'


  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import { User } from "../../proto/user_message_pb"
  import { Alumni } from "../../proto/alumni_message_pb"
  import { AlumniAppraiser } from "../../proto/alumni_appraiser_message_pb"
  import { ListInput } from '../../proto/generic_message_pb'

  import userService from '../services/user'
  import alumniService from '../services/alumni'
  import AlumniListService from '../services/alumniList'
  import appraiserService from '../services/appraiser'

  const userProto = new User()
  const alumniProto = new Alumni()
  const alumniAppraiserProto = new AlumniAppraiser()

  let search = '';
  let limit = 10;
  let page = 1;

  const listInputProto = new ListInput()
  listInputProto.setSearch(search)
  listInputProto.setLimit(limit)
  listInputProto.setPage(page)

  let alumniList = [];
  let selectedAlumni;

  let userId = undefined;

  async function alumniListCall(token){
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient
      },
      token
    }

    const alumni = new AlumniListService(deps, listInputProto)
    return await alumni.alumniList()
  }

  afterUpdate(async () => {
    if (userId && alumniList.length === 0) {
      try {
        const token = Cookies.get('token')
        const alumniStream = await alumniListCall(token);
        alumniStream.on('data', (response) => {
          alumniList = [ ...alumniList, response.toObject().alumni]
          console.log(`alumniList`, alumniList)
        })
        alumniStream.on('end', () => {
          console.log('End stream = ');
        })
      } catch(e) {
        errorServiceHandling(e)
        notifications.danger(e.message)
      }

    }
  })

  afterUpdate(() => {
    if (selectedAlumni) {
      // console.log(`selectedAlumni`, selectedAlumni)
      alumniProto.setId(selectedAlumni.id)
      alumniProto.setCreated(selectedAlumni.created)
      alumniProto.setDateOfBirth(selectedAlumni.dateOfBirth)
      alumniProto.setGraduationYear(selectedAlumni.graduationYear)
      alumniProto.setMajorStudy(selectedAlumni.majorStudy)
      alumniProto.setName(selectedAlumni.name)
      alumniProto.setNik(selectedAlumni.nik)
      alumniProto.setNim(selectedAlumni.nim)
      alumniProto.setNoIjazah(selectedAlumni.noIjazah)
      alumniProto.setPhone(selectedAlumni.phone)
      alumniProto.setPlaceOfBirth(selectedAlumni.placeOfBirth)
      alumniProto.setUpdated(selectedAlumni.updated)
      alumniProto.setUserId(selectedAlumni.userId)
      alumniAppraiserProto.setAlumni(alumniProto)
      // console.log(`alumniAppraiserProto`, alumniAppraiserProto)
    }
  })

  const onChange = event => {
    // console.log(`event.target.name`, event.target.name)
    // console.log(`event.target.value`, event.target.value)

    switch (event.target.name) {
      case 'email':
        userProto.setEmail(event.target.value)
        break;
      case 'name':
        userProto.setName(event.target.value)
        alumniAppraiserProto.setName(event.target.value)
        break;
      case 'instansi':
        alumniAppraiserProto.setInstansi(event.target.value)
        break;
      case 'position':
        alumniAppraiserProto.setPosition(event.target.value)
        break;
      case 'alumni_position':
        alumniAppraiserProto.setAlumniPosition(event.target.value)
        break;

      default:
        break;
    }

  }

  async function userRegistrationCall(){
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient
      }
    }

    userProto.setUserType(2) // 2 = appraiser
    
    const user = new userService(deps, userProto)
    return await user.create();
  }

  async function appraiserRegistrationCall(id){
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient
      }
    }

    alumniAppraiserProto.setUserId(id)

    console.log(`alumniAppraiserProto`, alumniAppraiserProto.array)
    
    const appraiser = new appraiserService(deps, alumniAppraiserProto)
    return await appraiser.registration();
  }

  const lanjutkan = async (event) => {
    event.preventDefault()

    if (!userId) {
      try {
        const registerUser = await userRegistrationCall()
        console.log(`registerUser`, registerUser)
        Cookies.set('token', registerUser.getToken())
        Cookies.set('usertype', registerUser.getUserType())
        Cookies.set('username', registerUser.getName())

        userId = registerUser.array[0]
      
      } catch(e) {
        console.log(`e`, e)
        notifications.danger(e.message)
      }
    } else {
      try {
        const appraiserRegister = await appraiserRegistrationCall(userId)
        console.log(`appraiserRegister`, appraiserRegister)
  
        navigate(PATH_URL.KUISIONER_FORM, { replace: true })
        
      } catch(e) {
        console.log(`e`, e)
        notifications.danger(e.message)
      }

    }
  };

</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <div class='sticky top-0 pt-6 pb-4 -mb-4 bg-white'>
          <a href="/" class="flex items-center mb-8">
            <i class="mr-4 fas fa-arrow-left"></i>
            <p class="text-base">Kembali ke halaman utama</p>
          </a>
          <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
            <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
          </h1>
        </div>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
          Tracer study adalah penelitian mengenai situasi alumni khususnya dalam hal pencarian kerja, situasi kerja, dan pemanfaatan pemerolehan kompetensi selama kuliah di Poltekkes Kemenkes Medan. Manfaat tracer study tidaklah terbatas pada perguruan tinggi saja, tetapi  lebih jauh lagi dapat memberikan informasi penting mengenai hubungan (link) antara dunia pendidikan tinggi dengan dunia kerja.  Tracer study dapat menyajikan informasi mendalam dan rinci mengenai kecocokan/match kerja baik horisontal (antar berbagai bidang ilmu) maupun vertikal (antar berbagai level/strata pendidikan). 
        </p>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">Dengan demikian, tracer study dapat ikut membantu mengatasi permasalahan kesenjangan kesempatan kerja dan upaya perbaikannya.  Bagi Poltekkes Kemenkes Medan, informasi mengenai kompetensi yang relevan bagi dunia kerja dapat membantu upaya perbaikan kurikulum dan sistem pembelajaran.  Di sisi lain, dunia industri dan dunia kerja dapat melihat ke dalam instistusi pendidikan tinggi melalui hasil tracer study, dan dengan demikian dapat menyiapkan diri dengan menyediakan pelatihan-pelatihan yang lebih relevan bagi sarjana pencari kerja baru.
        Selanjutnya kami mengharapkan saudara dapat mengisi kuisioner ini dengan jujur, agar didapatkan hasil yang maksimal. Terima kasih.
        </p>

        <div class="px-4 py-3 mt-8 text-blue-900 border-t-4 border-blue-500 rounded-b shadow-sm bg-blue-50" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="w-6 h-6 mr-4 text-blue-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p class="font-bold">Informasi assword alumni</p>
              <p class="my-2 text-m sm:max-w-2xl">Kami akan mengirimkan password kepada akun yang Anda daftarkan pada aplikasi ini setelah Anda selesai mengisi kuisioner tracer study Poltekkes Medan.</p>
              <p class="my-2 text-m sm:max-w-2xl">Password tersebut bisa Anda gunakan untuk mengakses dan memanfaatkan fitur online kemahasiswaan kami.</p>
            </div>
          </div>
        </div>
        
        <hr class="my-8 md:min-w-full" />
        
        <form action="#" method="POST">
          <div class="">
            {#if !userId}
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
                <input on:change="{onChange}" type="text" name="name" id="name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input on:change="{onChange}" type="text" name="email" id="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>
            </div>
            {:else if userId}
              <div class="grid grid-cols-4 gap-4">
                <div class="col-span-4">
                  <label for="instansi" class="block text-sm font-medium text-gray-700">Instansi</label>
                  <input on:change="{onChange}" type="text" name="instansi" id="instansi" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                </div>

                <div class="col-span-4">
                  <label for="position" class="block text-sm font-medium text-gray-700">Posisi</label>
                  <input on:change="{onChange}" type="text" name="position" id="position" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                </div>

                <div class="col-span-4">
                  <label for="alumni" class="block text-sm font-medium text-gray-700">Nama Alumni</label>
                  <!-- <input on:change="{onChange}" type="text" name="alumni" id="alumni" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m"> -->
                  <AutoComplete
                    className='block mt-1 col-span-4 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m'
                    inputClassName='w-full px-4 py-2 mt-1 border-none focus:ring-transparent'
                    dropdownClassName='max-h-10 mt-2 border-gray-300 rounded-md shadow-sm'
                    items={alumniList}
                    bind:selectedItem={selectedAlumni}
                    labelFieldName="name"
                  />
                </div>

                <div class="col-span-4">
                  <label for="alumni_position" class="block text-sm font-medium text-gray-700">Posisi Alumni</label>
                  <input on:change="{onChange}" type="text" name="alumni_position" id="alumni_position" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                </div>
              </div>
            {/if}

            <div class="px-4 py-3 mt-10 text-right bg-gray-50 sm:px-6">
              <button on:click="{lanjutkan}" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Lanjutkan
              </button>
            </div>
          </div>
        </form>

      </div>
    </main>

  </div>
</div>