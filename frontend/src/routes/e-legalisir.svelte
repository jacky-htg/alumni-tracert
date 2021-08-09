<script>
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
	import { ListInput } from '../../proto/generic_message_pb'
  import LegalisirService from '../services/legalisirList'
	import Sidebar from "../components/Sidebar.svelte";
	import { navigate } from 'svelte-routing'
	import { onMount } from 'svelte'
	import { notifications } from "../helper/toast";
	import { HOST_URL, APP_ENV } from '../env'
	import { Legalize } from '../../proto/legalize_message_pb'
	import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
	import Cookies from 'js-cookie'
	import errorServiceHandling from '../helper/error_service'
	import Button from '../components/Button.svelte'
	import LegalizeService from '../services/legalize'
import AccessDenied from './accessDenied.svelte';

	let search = '';
	let limit = 10;
	let page = 1;
	const usertype = Cookies.get('usertype');
	// state legalisir admin
	const listInputProto = new ListInput()
  listInputProto.setSearch(search)
	listInputProto.setLimit(limit)
	listInputProto.setPage(page)

  let legalisirList = [];
	var deps = {
		proto: {
			TracertClient: TracertServicePromiseClient
		}
	}
  async function legalisirListCall(){
    const legalisir = new LegalisirService(deps, listInputProto)
		return await legalisir.legalizeList()
	}

	const requestList = async () => {
		const legalisirStream = await legalisirListCall(usertype);
		legalisirStream.on('data', (response) => {
			legalisirList = [ ...legalisirList, response.toObject().legalize]
		})
		legalisirStream.on('end', () => {
			console.log('End stream = ');
		})
	}

	onMount(async () => {
		try {
			await requestList()
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

	const updateStatusList = (id, status) => {
		legalisirList = legalisirList.map((leg) => {
			if(leg.id === id) leg.status = status
			return leg
		})
	}

	let isLoadingReject = false;
	let isLoadingAccept = false;
	let isLoadingApproved = false;

	const onReject = async (id) => {
		try {
			isLoadingReject = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.reject(document.querySelecto)
			updateStatusList(id, 0)
			isLoadingReject = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingReject = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}

	const onAccept = async (id) => {
		try {
			isLoadingAccept = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.verify() 
			updateStatusList(id, 2)
			isLoadingAccept = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingAccept = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}

	const onApprove = async (id) => {
		try {
			isLoadingApproved = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.approve()
			updateStatusList(id, 4)
			isLoadingApproved = false;
		} catch(e) {
			errorServiceHandling(e)
			isLoadingApproved = false;
			if (Cookies.get('token') == null) {
				location = PATH_URL.LOGIN  
			} 
			notifications.danger(e.message)
		}
	}
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		<Sidebar active="e-legalisir" sideBarMenus={SIDEBAR_ADMIN} pathImage="../" />

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
									<tr class="legalisir-row">
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
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center justify-end">
												{#if usertype === "4"}
													{#if legalist.status === 2}
														<Button isLoading={isLoadingApproved} on:click={() => onApprove(legalist.id)} className="mr-2" bgColor="bg-yellow-300" bgHoverColor="bg-yellow-200" size="small">Accept</Button>
													{/if}
												{:else}
													{#if legalist.status === 1}
														<Button isLoading={isLoadingReject} on:click={() => onReject(legalist.id)} className="mr-2" bgColor="bg-red-500" bgHoverColor="bg-red-400" size="small">Reject</Button>
														<Button isLoading={isLoadingAccept} on:click={() => onAccept(legalist.id)} className="mr-2" bgColor="bg-green-500" bgHoverColor="bg-green-400" size="small">Verify</Button>
													{/if}
												{/if}
												<Button on:click={() => onViewDetail(legalist.id)} size="small" bgColor="bg-gray-400" bgHoverColor="bg-gray-300">View</Button>
											</div>
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