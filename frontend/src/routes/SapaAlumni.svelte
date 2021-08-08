<script>
  import Sidebar from "../components/Sidebar.svelte";
	import { SIDEBAR_USER } from '../helper/path'
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar active="hi-alumni" sideBarMenus={SIDEBAR_USER}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">Sapa Alumni</h1>

			<h2>Underconstruction.</h2>
      <p>Halaman ini masih dalam pengembangan dengan fitur berupa berita-berita tentang alumni Poltekkes Medan.</p>

		</main>

	</div>
</div>