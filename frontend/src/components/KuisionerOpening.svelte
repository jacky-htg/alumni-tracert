<script>
  import { Link } from 'svelte-routing'
  import { Images } from '../helper/images'
</script>

<div>
  <div class='sticky top-0 pt-6 mt-6 bg-white'>
    <a href="/" class="flex items-center mb-8">
      <i class="mr-4 fas fa-arrow-left"></i>
      <p class="text-base">Kembali ke halaman utama</p>
    </a>
    <img class="object-cover w-64 h-full pb-8 mb-6" src={Images.logo_poltekkes} alt="">
    
    <hr class="mb-8 md:min-w-full" />
  </div>
  <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
    <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
  </h1>
  <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
    Tracer study adalah penelitian mengenai situasi alumni khususnya dalam hal pencarian kerja, situasi kerja, dan pemanfaatan pemerolehan kompetensi selama kuliah di Poltekkes Kemenkes Medan. Manfaat tracer study tidaklah terbatas pada perguruan tinggi saja, tetapi  lebih jauh lagi dapat memberikan informasi penting mengenai hubungan (link) antara dunia pendidikan tinggi dengan dunia kerja.  Tracer study dapat menyajikan informasi mendalam dan rinci mengenai kecocokan/match kerja baik horisontal (antar berbagai bidang ilmu) maupun vertikal (antar berbagai level/strata pendidikan). 
  </p>
  <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">Dengan demikian, tracer study dapat ikut membantu mengatasi permasalahan kesenjangan kesempatan kerja dan upaya perbaikannya.  Bagi Poltekkes Kemenkes Medan, informasi mengenai kompetensi yang relevan bagi dunia kerja dapat membantu upaya perbaikan kurikulum dan sistem pembelajaran.  Di sisi lain, dunia industri dan dunia kerja dapat melihat ke dalam instistusi pendidikan tinggi melalui hasil tracer study, dan dengan demikian dapat menyiapkan diri dengan menyediakan pelatihan-pelatihan yang lebih relevan bagi sarjana pencari kerja baru.
  </p>

  <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
    Selanjutnya kami mengharapkan saudara dapat mengisi kuisioner ini dengan jujur, agar didapatkan hasil yang maksimal. Terima kasih
  </p>

  <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
    Hormat Kami : Kemahasiswaan Poltekkes Kemenkes Medan <br/>
    Email : kemahasiswaan.poltekkesmedan@gmail.com
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
</div>