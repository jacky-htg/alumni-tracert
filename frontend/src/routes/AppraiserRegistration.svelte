<script>
  import { Link } from 'svelte-routing'

  import { token } from '../stores/token.js'
  import { Images } from '../helper/images'

  import { AlumniAppraiser } from "../../proto/alumni_appraiser_message_pb"
  import { User, AlumniRegistrationInput } from "../../proto/user_message_pb"

  const logout = () => {
      localStorage.clear()
      token.set(localStorage.getItem('token'))
  }
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <a use:Link href="/" class="flex items-center mb-8">
          <i class="mr-4 fas fa-arrow-left"></i>
          <p class="text-base">Kembali ke halaman utama</p>
        </a>
        <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
          <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
        </h1>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
          Tracer study adalah penelitian mengenai situasi alumni khususnya dalam hal pencarian kerja, situasi kerja, dan pemanfaatan pemerolehan kompetensi selama kuliah di Poltekkes Kemenkes Medan. Manfaat tracer study tidaklah terbatas pada perguruan tinggi saja, tetapi  lebih jauh lagi dapat memberikan informasi penting mengenai hubungan (link) antara dunia pendidikan tinggi dengan dunia kerja.  Tracer study dapat menyajikan informasi mendalam dan rinci mengenai kecocokan/match kerja baik horisontal (antar berbagai bidang ilmu) maupun vertikal (antar berbagai level/strata pendidikan). 
        </p>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">Dengan demikian, tracer study dapat ikut membantu mengatasi permasalahan kesenjangan kesempatan kerja dan upaya perbaikannya.  Bagi Poltekkes Kemenkes Medan, informasi mengenai kompetensi yang relevan bagi dunia kerja dapat membantu upaya perbaikan kurikulum dan sistem pembelajaran.  Di sisi lain, dunia industri dan dunia kerja dapat melihat ke dalam instistusi pendidikan tinggi melalui hasil tracer study, dan dengan demikian dapat menyiapkan diri dengan menyediakan pelatihan-pelatihan yang lebih relevan bagi sarjana pencari kerja baru.
        Selanjutnya kami mengharapkan saudara dapat mengisi kuisioner ini dengan jujur, agar didapatkan hasil yang maksimal. Terima kasih.
        </p>
        
        <hr class="my-8 md:min-w-full" />
        
        <form action="#" method="POST">
          <div class="overflow-hidden">
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-4">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">NIM</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">NIK</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4 sm:col-span-4 lg:col-span-1">
                <label for="city" class="block text-sm font-medium text-gray-700">Tempat lahir</label>
                <input type="text" name="city" id="city" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-4 sm:col-span-4 lg:col-span-1">
                <label for="city" class="block text-sm font-medium text-gray-700">Tanggal kelahiran</label>
                <input type="text" name="city" id="city" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-4 sm:col-span-3 lg:col-span-1">
                <label for="state" class="block text-sm font-medium text-gray-700">Bulan kelahiran</label>
                <input type="text" name="state" id="state" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-4 sm:col-span-3 lg:col-span-1">
                <label for="postal-code" class="block text-sm font-medium text-gray-700">Tahun kelahiran</label>
                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="country" class="block text-sm font-medium text-gray-700">Jurusan/Prodi</label>
                <select id="country" name="country" autocomplete="country" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option>Pilihan A</option>
                  <option>Pilihan B</option>
                  <option>Pilihan C</option>
                </select>
              </div>

              <div class="col-span-2">
                <label for="country" class="block text-sm font-medium text-gray-700">Tahun lulus</label>
                <select id="country" name="country" autocomplete="country" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option>Pilihan A</option>
                  <option>Pilihan B</option>
                  <option>Pilihan C</option>
                </select>
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Nomor Ijazah</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Nomor telp./WhatsApp</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>
              
              
            </div>
            
            <fieldset class="mt-16 mb-8">

              <legend class="mb-4 text-base font-medium text-gray-900">TRACER STUDY</legend>
              
              <!-- question sets -->
              <div>
                <p class="text-xl font-semibold text-black">Bagaimana anda menggambarkan situasi sekarang?</p>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                      Saya sudah bekerja 
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                      Saya masih melanjutkan kuliah
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      Saya belum bekerja
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      Saya seddang mencari pekerjaan
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      Saya sudah menikah dan fokus mengurus keluarga
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Lanjutkan
              </button>
            </div>
          </div>
        </form>

      </div>
    </main>

  </div>
</div>