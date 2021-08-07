<script>
  import { PATH_URL } from '../helper/path'
  import { token } from '../stores/token.js'
  import Upload from "../components/Upload.svelte";
  import { Images } from '../helper/images'
  import { HOST_URL, APP_ENV } from '../env'
  import { notifications } from "../helper/toast";

  let isLoading = false;

  const onUpload = async (e) => {
    const { acceptedFiles, fileRejections } = e.detail;
    isLoading = true;
    try {
      const response = await fetch(`${HOST_URL}/upload`, { // Your POST endpoint
        method: 'POST',
        /* headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          "Content-Type": "need content type"
          "token": "need token"
        }, */
        body: acceptedFiles[0]
      }).then(
        response => response.json()
      );
      isLoading = false;
      console.log('RESPONSE = ', response);
    } catch(e) {
      isLoading = false;
      notifications.danger(e.message)
    }
  }
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <a href={PATH_URL.BASE} class="flex items-center mb-8">
          <i class="mr-4 fas fa-arrow-left"></i>
          <p class="text-base">Kembali ke halaman utama</p>
        </a>
        <img class="object-cover w-64 h-full mb-4" src={Images.logo_poltekkes} alt="">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">
          <span class="block xl:inline">UPLOAD IJAZAH UNTUK DI LEGALISIR</span>
        </h1>
        <p class="mt-3 mb-4 text-base text-gray-500 sm:mt-5 sm:text-s sm:max-w-3xl sm:mx-auto md:mt-5 md:text-s lg:mx-0">
          Silakan Upload file ijazah yang akan di legalisir
        </p>
        
        <hr class="my-8 md:min-w-full" />
        <Upload on:drop={onUpload} isLoading={isLoading}/>
      </div>
    </main>
  </div>
</div>