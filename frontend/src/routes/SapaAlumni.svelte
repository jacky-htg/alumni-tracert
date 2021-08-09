<script>
  import Sidebar from "../components/Sidebar.svelte";
	import { SIDEBAR_USER } from '../helper/path'
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="hi-alumni" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-20 text-4xl font-bold">Sapa Alumni</h1>

			<h2 class="mb-8 text-3xl font-bold text-blue-700">Halaman ini masih dalam tahap pengembangan.</h2>
      <p class="mb-4 text-base font-semibold">Halaman ini masih dalam pengembangan dengan fitur berupa berita-berita tentang alumni Poltekkes Medan.</p>
		</main>

	</div>
</div>