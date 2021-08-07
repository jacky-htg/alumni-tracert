<script>
	import { Link } from 'svelte-routing'
	import { token } from '../stores/token.js'
	import Sidebar from "../components/Sidebar.svelte";

	const logout = () => {
		localStorage.clear()
		token.set(localStorage.getItem('token'))
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
				<div class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
					<div class="space-y-1 text-center">
						<svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<div class="flex text-sm text-gray-600">
							<label for="file-upload" class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only">
							</label>
							<p class="pl-1">or drag and drop</p>
						</div>
						<p class="text-xs text-gray-500">
							PDF, PNG, JPG up to 10MB
						</p>
					</div>
				</div>
			</div>

			<div class="mb-12">
				<label class="block text-sm font-medium text-gray-700">
					Upload transkrip nilai
				</label>
				<div class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
					<div class="space-y-1 text-center">
						<svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<div class="flex text-sm text-gray-600">
							<label for="file-upload" class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only">
							</label>
							<p class="pl-1">or drag and drop</p>
						</div>
						<p class="text-xs text-gray-500">
							PDF, PNG, JPG up to 10MB
						</p>
					</div>
				</div>
			</div>
			
		</main>

	</div>
</div>