<script>
  import { token } from '../stores/token.js'
  import KuisionerOpening from '../components/KuisionerOpening.svelte'

  let name, nim, nik, city, bod, jurusan, graduationYear, noIjazah, phone, email

  const changeName = (event) => {
    name = event.currentTarget.value;
    alert(name)
  }

  const logout = () => {
      localStorage.clear()
      token.set(localStorage.getItem('token'))
  }
</script>

<div class="flex flex-wrap w-full h-full">
  <div class="flex w-full p-4 align-center">

    <main class="max-w-full px-4 mx-auto my-24 sm:mt-12 sm:px-6 md:mt-16 lg:my-24 lg:px-8">
      <div class="sm:text-center lg:text-left">
        <KuisionerOpening/>
        <h2 class="text-xl font-semibold text-black">Data Alumni</h2>
          <div class="overflow-hidden">
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
                <input on:change="{changeName}" type="text" name="name" id="name" autocomplete="given-name" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="nim" class="block text-sm font-medium text-gray-700">NIM</label>
                <input type="text" name="nim" id="nim" autocomplete="nim" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="nik" class="block text-sm font-medium text-gray-700">NIK</label>
                <input type="text" name="nik" id="nik" autocomplete="nikemail" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-2 sm:col-span-2 lg:col-span-1">
                <label for="city" class="block text-sm font-medium text-gray-700">Tempat lahir</label>
                <input type="text" name="city" id="city" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2 sm:col-span-2 lg:col-span-1">
                <label for="bod" class="block text-sm font-medium text-gray-700">Tanggal kelahiran</label>
                <input type="date" name="bod" id="bod" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-2">
                <label for="jurusan" class="block text-sm font-medium text-gray-700">Jurusan/Prodi</label>
                <select id="jurusan" name="jurusan" autocomplete="jurusan" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option>Jurusan Analisis Kesehatan/TLM</option>
                  <option>Jurusan Farmasi</option>
                  <option>Prodi D4 Gizi</option>
                  <option>Prodi D3 Gizi</option>
                  <option>Prodi D4 Keperawatan</option>
                  <option>Prodi D3 Keperawatan Medan</option>
                  <option>Jurusan Kesehatan Gigi</option>
                  <option>Prodi D4 Sanitasi</option>
                  <option>Prodi D3 Sanitasi</option>
                  <option>Prodi D4 Kebidanan</option>
                  <option>Prodi D3 Kebidanan Medan</option>
                  <option>Prodi D3 Kebidanan P. Sidimpuan</option>
                  <option>Prodi D3 Kebidanan P. Siantar</option>
                  <option>Prodi D3 Kebidanan Tarutung</option>
                  <option>Prodi D3 Kebidanan Karo</option>
                  <option>Prodi D3 Keperawatan Gunung Sitoli</option>
                  <option>Prodi D3 Kebidanan Dairi</option>
                  <option>Prodi D3 Keperawatan Sibolga</option>
                  <option>Prodi Profesi Bidan</option>
                </select>
              </div>

              <div class="col-span-2">
                <label for="graduation-year" class="block text-sm font-medium text-gray-700">Tahun lulus</label>
                <select id="graduation-year" name="graduation-year" autocomplete="graduation-year" class="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                </select>
              </div>

              <div class="col-span-4">
                <label for="no-ijazah" class="block text-sm font-medium text-gray-700">Nomor Ijazah</label>
                <input type="text" name="no-ijazah" id="no-ijazah" autocomplete="no-ijazah" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">Nomor telp./WhatsApp</label>
                <input type="text" name="phone" id="phone" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>

              <div class="col-span-4">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" name="email-address" id="email-address" autocomplete="email" class="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-m">
              </div>
              
              
            </div>
            
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Lanjutkan
              </button>
            </div>
          </div>

      </div>
    </main>

  </div>
</div>