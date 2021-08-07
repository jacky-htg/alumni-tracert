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
			
			<h1 class="mb-12 text-4xl font-bold">List Alumni</h1>

			<div class="flex flex-col">
				<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200">
								<thead class="bg-gray-50">
									<tr>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Name
										</th>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Email
										</th>
										<th scope="col" class="relative px-6 py-3">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Jane Cooper
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">jane.cooper@example.com</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href="#" class="text-indigo-600 hover:text-indigo-900">View profile</a>
										</td>
									</tr>

									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Jane Cooper
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">jane.cooper@example.com</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href="#" class="text-indigo-600 hover:text-indigo-900">View profile</a>
										</td>
									</tr>

									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Jane Cooper
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">jane.cooper@example.com</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href="#" class="text-indigo-600 hover:text-indigo-900">View profile</a>
										</td>
									</tr>

									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														Jane Cooper
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">jane.cooper@example.com</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href="#" class="text-indigo-600 hover:text-indigo-900">View profile</a>
										</td>
									</tr>

									<!-- More people... -->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			
		</main>

	</div>
</div>