<script>
  import Sidebar from "../components/Sidebar.svelte";
	import { SIDEBAR_USER } from '../helper/path'
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="e-legalisir" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">Tentang Kami</h1>

			<h2>Underconstruction.</h2>
      <p>Halaman ini masih dalam pengembangan dengan fitur-fitur berikut :</p>
      <ol>
        <li>Tentang CDC Poltekkes Kemenkes Medan</li>
        <li>Struktur Organisasi</li>
        <li>Kontak CDC Poltekkes Kemenkes Medan</li>
        <li>FAQ (Frequently Asked Question)</li>
      </ol>
		</main>

	</div>
</div>