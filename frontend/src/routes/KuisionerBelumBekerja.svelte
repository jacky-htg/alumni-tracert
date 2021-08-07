<script>
  import { Link } from 'svelte-routing'
  import { token } from '../stores/token.js'
  import { Images } from '../helper/images'

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
          <p class="text-base">Kembali ke Tracer study</p>
        </a>
        <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
          <span class="block xl:inline">TRACER STUDY/PENGGUNA ALUMNI YANG BELUM BEKERJA</span>
        </h1>
        
        <hr class="my-8 md:min-w-full" />
        
        <form action="#" method="POST">
          <div class="overflow-hidden">
            <div class="grid grid-cols-4 gap-4">

              <div class="col-span-4">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Dimana anda melanjutkan kuliah?</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <fieldset class="col-span-4 mt-4 mb-8">
                
                <!-- question sets -->
                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir?</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Tidak
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        Tidak, tapi saya sedang menunggu hasil dari lamaran kerja
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Ya, saya akan mulai bekerja dalam 2 minggu ke depan
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Ya, tapi saya belum pasti akan berkerja dalam 2 minggu terakhir
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Apakah anda pernah bekerja sebelumya?</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <div class="ml-3 text-sm">
                        <label for="push-nothing" class="block text-sm font-medium text-gray-700">
                          Sudah, dimana?
                        </label>
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                      </div>
                    </div>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Belum
                      </label>
                    </div>
                  </div>
                </div>

              </fieldset>
            
            </div>

            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Kirim kuisioner
              </button>
            </div>
          </div>
        </form>

      </div>
    </main>

  </div>
</div>