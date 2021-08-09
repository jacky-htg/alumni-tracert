<script>
  import { Link } from 'svelte-routing'
  import { Images } from '../helper/images'
</script>

<div class="sticky top-0 pt-6 bg-white">
  <a href="/" class="flex items-center mb-8">
    <i class="mr-4 fas fa-arrow-left"></i>
    <p class="text-base">Kembali ke halaman utama</p>
  </a>
  <img class="object-cover w-64 h-full mb-6" src={Images.logo_poltekkes} alt="logo poltekkes medan">
  <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
    <span class="block xl:inline">KUISIONER TRACER STUDY/PENGGUNA ALUMNI</span>
  </h1>
  
  <hr class="my-8 md:min-w-full" />
</div>