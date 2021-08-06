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
          <span class="block xl:inline">TRACER STUDY/PENGGUNA ALUMNI YANG SUDAH BEKERJA</span>
        </h1>
        
        <hr class="my-8 md:min-w-full" />
        
        <form action="#" method="POST">
          <div class="overflow-hidden">
            <div class="grid grid-cols-4 gap-4">

              <div class="col-span-4">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Nama Tempat Kerja Anda saat ini</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <fieldset class="col-span-4 mt-4 mb-8">
                
                <!-- question sets -->
                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Kapan Anda mulai mencari pekerjaan</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Sebelum lulus 
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        ≤3 bulan setelah lulus
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        ≥3 bulan setelah lulus
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        ≤6 bulan setelah lulus
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        ≥6 bulan setelah lulus
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Bagaimana Anda mencari pekerjaan tersebut? (Jawaban boleh lebih dari satu)</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Melalui iklan di koran/majalah, brosur</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Melamar ke perusahaan tanpa mengetahui lowongan yang ada</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Pergi ke bursa pameran kerja</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Mencari lewat internet/iklan online/milis</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Dihubungi oleh perusahaan</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Menghubungi agen tenaga kerja</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Memperoleh informasi dari ikatan alumni</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Memperoleh informasi dari kampus</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll)</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Melalui penempatan kerja atau magang</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Bekerja di tempat praktek waktu semasa kuliah</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Berapa perusahaan/instansi/tempat kerja yang sudah Anda lamar (lewat surat atrau email) sebelum Anda memperoleh pekerjaan utama (jika tidak ada jawab lainnya)</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Kurang dari 3 bulan
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        Lebih dari 3 bulan
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Lainnya
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Berapa perusahaan/instansi/tempat kerja yang mengundang Anda untuk wawancara (jika tidak ada jawab lainnya*</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Kurang dari 3 bulan
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        Lebih dari 3 bulan
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Lainnya
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mb-8">
                  <p class="max-w-4xl text-xl font-semibold text-black">Apa perusahaan/instansi/institusi tempat Anda bekerja sekarang?</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Instansi pemerintah (termasuk BUMN)
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        Organisasi non profit/lembaga swadaya masyarakat
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Perusahaan swasta
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Wiraswasta/perusahaan sendiri
                      </label>
                    </div><div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Lainnya
                      </label>
                    </div>
                  </div>
                </div>

              </fieldset>

              <div class="col-span-4">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Kira-kira berapa pendapatan Anda setiap bulannya (IDR)? (isi dengan angka saja)</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>
            
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