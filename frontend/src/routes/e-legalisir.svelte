<script>
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
	import { ListInput } from '../../proto/generic_message_pb'
  import LegalisirService from '../services/legalisirList'
	import Sidebar from "../components/Sidebar.svelte";
	import { navigate } from 'svelte-routing'
	import { onMount } from 'svelte'
	import { notifications } from "../helper/toast";
	import { HOST_URL, APP_ENV } from '../env'
	import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
	import Cookies from 'js-cookie'
	import errorServiceHandling from '../helper/error_service'

	let search = '';
	let limit = 10;
	let page = 1;
	// state legalisir admin
	const listInputProto = new ListInput()
  listInputProto.setSearch(search)
	listInputProto.setLimit(limit)
	listInputProto.setPage(page)

  let legalisirList = [];
  
  async function legalisirListCall(userType){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const legalisir = new LegalisirService(deps, listInputProto)
		return await legalisir.legalizeList()
	}

	onMount(async () => {
		try {
			const usertype = Cookies.get('usertype');
			const legalisirStream = await legalisirListCall(usertype);
			const fieldObject = usertype == 4 ? 'legalize' : 'alumniAppraiser';
			legalisirStream.on('data', (response) => {
				legalisirList = [ ...legalisirList, response.toObject()[fieldObject]]
			})
			legalisirStream.on('end', () => {
				console.log('End stream = ');
			})
    } catch(e) {
			errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
	})

	const getStatus = (status) => {
		switch(status) {
			case 0:
				return 'rejected';
			case 1:
				return 'submit';
			case 2:
				return 'verified';
			default:
				return 'approved'
		}
	}

	const onViewDetail = (id) => {
		navigate(`${PATH_URL.ADMIN_LEGALISIR_DETAIL}?id=${id}`, { replace: false })
	}
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		<Sidebar active="e-legalisir" sideBarMenus={SIDEBAR_ADMIN}/>

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			
			<h1 class="mb-12 text-4xl font-bold">List Legalisir</h1>

			<div class="flex flex-col">
				<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200">
								<thead class="bg-gray-50">
									<tr>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Nama
										</th>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											NIM
										</th>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Status
										</th>
										<th scope="col" class="relative px-6 py-3">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each legalisirList as legalist}
									<tr class="cursor-pointer" on:click={() => onViewDetail(legalist.id)}>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														{legalist.alumni.name}
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">{legalist.alumni.nim}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">{@html getStatus(legalist.status)}</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href={`${PATH_URL.ADMIN_LEGALISIR_DETAIL}?id=${legalist.id}`} class="text-indigo-600 hover:text-indigo-900">View</a>
										</td>
									</tr>
									{/each}
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