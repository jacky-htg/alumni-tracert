<script>
  import { Link } from 'svelte-routing'
  import { Images } from '../helper/images'
</script>

<div>
  <a href="/" class="flex items-center mb-8">
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
</div>