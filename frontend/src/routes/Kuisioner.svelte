<script>
  import { navigate } from 'svelte-routing'
  import { PATH_URL } from '../helper/path'
  import KuisionerOpening from '../components/KuisionerOpening.svelte'

  let statusALumni = null

  const lanjutkan = () => {
      if (statusALumni === "appraiser") {
        navigate(PATH_URL.APPRAISER_REGISTRATION, { replace: true })
      } else if (statusALumni === "alumni") {
        navigate(PATH_URL.ALUMNI_REGISTRATION, { replace: true })
      }
  }

  const onChange = (event) => {
    statusALumni = event.currentTarget.value;
  }
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <KuisionerOpening/>
        
        <form action="#" method="POST">
          <div class="overflow-hidden">
            
            <fieldset class="mt-16 mb-8">

              <!-- question sets -->
              <div>
                <p class="text-xl font-semibold text-black">STATUS PENGISI</p>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input checked={statusALumni==="appraiser"} on:change="{onChange}" value="appraiser" id="status-alumni-as-appraiser" name="status-alumni" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                      Pengguna Alumni
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input checked={statusALumni==="alumni"} on:change="{onChange}" value="alumni" id="status-alumni-as-alumni" name="status-alumni" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                      Alumni
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
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