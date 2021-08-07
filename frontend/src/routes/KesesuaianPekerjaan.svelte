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
          <span class="block xl:inline">KESESUAIAN PEKERJAAN</span>
        </h1>
        
        <hr class="my-8 md:min-w-full" />
        
        <form action="#" method="POST">
          <div class="overflow-hidden">
            <div class="grid grid-cols-4 gap-4">

              <div class="col-span-4">
                <label for="kesesuaian-kerja" class="max-w-4xl text-xl font-semibold text-black">Seberapa besar kesesuaian hubungan antara bidang studi dengan pekerjaan anda?</label>
                <span class="block max-w-4xl mb-4 text-sm text-red-500">*Ket: (UNTUK YANG MENJAWAB CUKUP, KURANG, DAN TIDAK SAMA SEKALI, mohon jawab pertanyaan No. 9, JIKA ANDA MENJAWAB SANGAT SESUAI DAN SESUAI, silahkan jawab pertanyaan No. 10)</span>
                <textarea id="kesesuaian-kerja" name="kesesuaian-kerja" rows="3" class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Kemukakan alasan disini"></textarea>
              </div>

              <fieldset class="col-span-4 mt-4 mb-8">
                
                <!-- question sets -->
                <div class="mb-12">
                  <p class="max-w-4xl text-xl font-semibold text-black">Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir?</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        Sangat sesuai
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        Sesuai
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Cukup Sesuai
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Kurang Sesuai
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        Tidak sama sekali
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mb-12">
                  <label for="first-name" class="max-w-4xl text-xl font-semibold text-black">Kemukanan alasan singkat, mengapa anda ambil pekerjaan ini?</label>
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl mb-4 text-xl font-semibold text-black">Kesesuain kompetensi lulusan dengan kebutuhan tempat kerja Anda saat ini*</p>
                  <div class="flex justify-between mt-6">
                    <span class="text-sm">Tidak sesuai</span>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        2
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        3
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        4
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        5
                      </label>
                    </div>
                    <span class="text-sm">Sangat sesuai</span>
                  </div>
                  <!-- <div class="flex justify-between w-full max-w-4xl mt-4">
                    <span class="text-sm">Tidak sesuai</span>
                    <span class="text-sm">Sangat sesuai</span>
                  </div> -->
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl mb-4 text-xl font-semibold text-black">Alat praktek laboratorium yang Anda gunakan saat kuliah sesuai dengan standar*</p>
                  <div class="flex justify-between mt-6">
                    <span class="text-sm">Tidak sesuai</span>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        2
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        3
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        4
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        5
                      </label>
                    </div>
                    <span class="text-sm">Sangat sesuai</span>
                  </div>
                  <!-- <div class="flex justify-between w-full max-w-4xl mt-4">
                    <span class="text-sm">Tidak sesuai</span>
                    <span class="text-sm">Sangat sesuai</span>
                  </div> -->
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl mb-4 text-xl font-semibold text-black">Pembelajaran di laboratorium saat anda masih kuliah sudah sesuai dengan pencapaian kompetensi*</p>
                  <div class="flex justify-between mt-6">
                    <span class="text-sm">Tidak sesuai</span>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        2
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        3
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        4
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        5
                      </label>
                    </div>
                    <span class="text-sm">Sangat sesuai</span>
                  </div>
                  <!-- <div class="flex justify-between w-full max-w-4xl mt-4">
                    <span class="text-sm">Tidak sesuai</span>
                    <span class="text-sm">Sangat sesuai</span>
                  </div> -->
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl mb-4 text-xl font-semibold text-black">Sistem pembimbingan praktek klinik (rumah sakit, klinik, komunitas) di masa kuliah sudah sesuai dengan pasar kerja</p>
                  <div class="flex justify-between mt-6">
                    <span class="text-sm">Tidak sesuai</span>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        2
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        3
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        4
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        5
                      </label>
                    </div>
                    <span class="text-sm">Sangat sesuai</span>
                  </div>
                  <!-- <div class="flex justify-between w-full max-w-4xl mt-4">
                    <span class="text-sm">Tidak sesuai</span>
                    <span class="text-sm">Sangat sesuai</span>
                  </div> -->
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl mb-4 text-xl font-semibold text-black">Kompetensi dosen pada saat kuliah sudah sesuai dengan keahliannya sehingga ilmu yang diberikan dapat diterapkan di pasar kerja</p>
                  <div class="flex justify-between mt-6">
                    <span class="text-sm">Tidak sesuai</span>
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-everything" class="block ml-3 text-sm font-medium text-gray-700">
                        1
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-email" class="block ml-3 text-sm font-medium text-gray-700">
                        2
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        3
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        4
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                      <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                        5
                      </label>
                    </div>
                    <span class="text-sm">Sangat sesuai</span>
                  </div>
                  <!-- <div class="flex justify-between w-full max-w-4xl mt-4">
                    <span class="text-sm">Tidak sesuai</span>
                    <span class="text-sm">Sangat sesuai</span>
                  </div> -->
                </div>

                <div class="mb-12">
                  <p class="max-w-4xl text-xl font-semibold text-black">Selain kompetensi utama yang saya miliki kompetensi tambahan lain yang harus dimiliki sesuai  dengan pekerjaan  saya (boleh pilih lebih dari satu)</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Bahasa Asing</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Kemampuan IT</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Kemampuan berkomunikasi</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Kemampuan analisis</label>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Keterampilan riset</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-12">
                  <label for="first-name" class="max-w-4xl text-xl font-semibold text-black">Kompetensi lain yang harus dimiliki/ditambah untuk bahan masukan ke jurusan/prodi saudara</label>
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                </div>

                <div class="mb-12">
                  <label for="first-name" class="max-w-4xl text-xl font-semibold text-black">Sarana Prasarana yang harus dimiliki/ditambah untuk bahan masukan ke jurusan/prodi saudara (jelaskan dari alat laboratorium, bahan praktikum, metode pembelajaran, gedung, dll. Misal : alat laboratorium di jurusan analis yang harus ditambah apa..., begitu seterusnya)</label>
                  <textarea id="kesesuaian-kerja" name="kesesuaian-kerja" rows="3" class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Tulis jawaban Anda disini"></textarea>
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