<script>
  import { Images } from '../helper/images'
  import Cookies from 'js-cookie'
  import { PATH_URL } from '../helper/path'
  import { navigate } from 'svelte-routing'
  import { onMount } from 'svelte'
  
  onMount(() => {
    if(Cookies.get('token')) {
      navigate(PATH_URL.DASHBOARD, { replace: true })
    }
  })
  
  // let src = 'images/poltekkes-medan.jpeg'
</script>

<div class="flex flex-wrap w-full h-full min-h-screen">
  <div class="flex items-center w-full p-4 md:w-2/3">

    <main class="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl">
          <span class="block xl:inline">Aplikasi ANTER Poltekkes Medan</span>
        </h1>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anda sudah mempunyai akun? Silahkan login untuk bisa menikmati fasilitas aplikasi ANTER Poltekkes Medan
        </p>
        <a href="/login" class="flex items-center justify-center w-48 px-6 py-2 text-base font-medium text-green-700 bg-green-300 border border-transparent rounded-md hover:bg-white hover:border-green-300 md:text-lg " style="color: #064E3B">
          Login
        </a>
        
        <hr class="my-8 md:min-w-full" />

        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Bagi alumni Poltekkes Medan yang belum mengisi kuesioner Tracer Study Poltekkes Medan, silahkan tekan tombol dibawah ini.
        </p>
        <a href="/kuisioner" class="flex items-center justify-center px-6 py-2 text-base font-medium text-green-700 bg-green-100 border border-transparent rounded-md w-max md:text-lg" style="color:#047857">
          Kuisioner alumni tracer
        </a>

        <hr class="my-8 md:min-w-full" />

        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Kunjungi halaman informasi kami lainnya
        </p>
        <div class="flex items-center">
          <a href="/cdc" class="text-base font-medium text-green-700 md:text-lg" style="color:#047857">
            Career Development Center (CDC)
          </a>
          <span class="mx-6 text-green-700">•</span>
          <a href="/sapa-alumni" class="text-base font-medium text-green-700 md:text-lg" style="color:#047857">
            Sapa Alumni
          </a>
          <span class="mx-6 text-green-700">•</span>
          <a href="/tentang-kami" class="text-base font-medium text-green-700 md:text-lg" style="color:#047857">
            Tentang Kami
          </a>
        </div>
        
      </div>
    </main>

  </div>
  <div class="flex w-full mt-4 md:mt-0 md:w-1/3 lg:inset-y-0 lg:right-0">
    <img class="object-cover w-full h-56 sm:h-72 md:h-full lg:w-full lg:h-full" src={Images.img_poltekkes} alt="Foto poltekkes">
  </div>
</div>