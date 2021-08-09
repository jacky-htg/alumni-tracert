<script>
  import Sidebar from "../components/Sidebar.svelte";
	import { SIDEBAR_USER } from '../helper/path'
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="cdc" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-20 text-4xl font-bold">Career Development Center</h1>

			<h2 class="mb-8 text-3xl font-bold text-blue-700">Halaman ini masih dalam tahap pengembangan.</h2>
      <p class="mb-4 text-base font-semibold">Halaman ini masih dalam pengembangan dengan fitur-fitur berikut :</p>
      <ol class="grid gap-2">
        <li>Konseling Karir</li>
        <li>Pelatihan Softskill</li>
        <li>Informasi Lowongan</li>
        <li>Informasi Karir</li>
      </ol>
		</main>

	</div>
</div>