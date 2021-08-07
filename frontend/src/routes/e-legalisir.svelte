<script>
	import { token } from '../stores/token.js'
	import Sidebar from "../components/Sidebar.svelte";
	import Upload from "../components/Upload.svelte";
	import { notifications } from "../helper/toast";
	import { HOST_URL, APP_ENV } from '../env'
	const state = {
		isLoadingIjazah: false,
		isLoadingTranskrip: false
	}
  const onUpload = async (e) => {
    const { acceptedFiles, name } = e.detail;
		const field = name === 'ijazah' ? 'isLoadingIjazah' : 'isLoadingTranskrip';
    state[field] = true;
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
      state[field] = false;
      console.log('RESPONSE = ', response);
    } catch(e) {
      state[field] = false;
      notifications.danger(e.message)
    }
  }
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		
		<Sidebar location={location}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">E-Legalisir</h1>

			<div class="mb-12">
				<label class="block text-sm font-medium text-gray-700">
					Upload ijazah
				</label>
				<Upload on:drop={onUpload} name="ijazah" isLoading={state.isLoadingIjazah}/>
			</div>

			<div class="mb-12">
				<label class="block text-sm font-medium text-gray-700">
					Upload transkrip nilai
				</label>
				<Upload on:drop={onUpload} name="transkrip" isLoading={state.isLoadingTranskrip}/>
			</div>
			
		</main>

	</div>
</div>