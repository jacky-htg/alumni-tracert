<script>
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
	import { ListInput } from '../../proto/generic_message_pb'
  import LegalisirService from '../services/legalisirList'
	import Sidebar from "../components/Sidebar.svelte";
	import { debounce } from '../helper/commons'
	import { navigate } from 'svelte-routing'
	import { onMount } from 'svelte'
	import { notifications } from "../helper/toast";
	import { Legalize } from '../../proto/legalize_message_pb'
	import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
	import Cookies from 'js-cookie'
	import errorServiceHandling from '../helper/error_service'
	import Button from '../components/Button.svelte'
	import LegalizeService from '../services/legalize'
  import printJS from 'print-js'

	let search = '';
	let limit = 10;
	let page = 0;
	let legalisirList = [];
	const usertype = Cookies.get('usertype');
	let isLoadingTable = false;
	let isLastPage = false;

	var deps = {
		proto: {
			TracertClient: TracertServicePromiseClient
		}
	}

	const onError = (e) => {
		isLoadingTable = false;
		errorServiceHandling(e)
		if (Cookies.get('token') == null) {
			location = PATH_URL.LOGIN  
		} 
		notifications.danger(e.message)
	}

	async function legalisirListCall(proto){
    const legalisir = new LegalisirService(deps, proto)
		return await legalisir.legalizeList()
	}

	const fetchData = async () => {
		const listInputProto = new ListInput()
		listInputProto.setSearch(search)
		listInputProto.setLimit(limit)
		listInputProto.setPage(page)
		const legalisirStream = await legalisirListCall(listInputProto);
		return new Promise((resolve, reject) => {
			let count = 0;
			let data = [];
			legalisirList = [];
			legalisirStream.on('data', (response) => {
				data = [ ...data, response.toObject().legalize];
				legalisirList = [ ...legalisirList, response.toObject().legalize]
				if(count >= limit-1) {
					resolve(data);
				} else {
					count++;
				}
			})
			legalisirStream.on('status', (status) => {
				if(status.code === 0) {
					resolve(data);
				}
			})
			legalisirStream.on('end', () => {
				resolve(data);
			})
			legalisirStream.on('error', (e) => {
				reject(e);
			})
		})
	}

	onMount(async () => {
		try {
			if (!(usertype === "3" || usertype === "4")) {
				notifications.danger("permission denied")
				navigate(`${PATH_URL.DASHBOARD}`, { replace: false })
			} else {
				isLoadingTable = true;
				await fetchData();
				isLoadingTable = false;
				if(legalisirList.length < limit) {
					isLastPage = true;
				}
			}
    } catch(e) {
			onError(e);
    }
	})

	const getStatus = (status) => {
		switch(status) {
			case 0:
				return 'Rejected';
			case 1:
				return 'Submit';
			case 2:
				return 'Verified';
			case 3:
				return 'Approved';
			default:
				return '-'
		}
	}

	const getColoStatus = (status) => {
		switch(status) {
			case 0:
				return 'text-red-500';
			case 1:
				return 'text-blue-500';
			case 2:
				return 'text-green-500';
			case 3:
				return 'text-green-600';
			default:
				return 'text-gray-900'
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
			await legalizeService.reject()
			updateStatusList(id, 0)
			isLoadingReject = false;
		} catch(e) {
			isLoadingReject = false;
			onError(e)
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
			isLoadingAccept = false;
			onError(e)
		}
	}

	const onApprove = async (id) => {
		try {
			isLoadingApproved = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.approve()
			updateStatusList(id, 3)
			isLoadingApproved = false;
		} catch(e) {
			isLoadingApproved = false;
			onError(e)
		}
	}

	const onDone = async (id) => {
		try {
			isLoadingApproved = true;
			const legalizeProto = new Legalize()
			legalizeProto.setId(id)
			
			const legalizeService = new LegalizeService(deps, legalizeProto)
			await legalizeService.done()
			updateStatusList(id, 3)
			isLoadingApproved = false;
		} catch(e) {
			isLoadingApproved = false;
			onError(e)
		}
	}

  const onPrint = (data) => {
		printJS(data, 'image');
  }

	const onNextPage = async () => {
		try {
			page++;
			isLoadingTable = true;
			await fetchData();
			isLoadingTable = false;
			if(legalisirList.length < limit) {
				isLastPage = true;
			}
		} catch(e) {
			onError(e);
		}
	}

	const onPrevPage = async () => {
		try {
			page--;
			isLoadingTable = true;
			await fetchData();
			isLoadingTable = false;
			isLastPage = false;
		} catch(e) {
			onError(e);
		}
	}

	const onSearch = (e) => {
		const { value } = e.target;
		debounce(async () => {
			try {
				page = 0;
				search = value;
				isLoadingTable = true;
				await fetchData();
				isLoadingTable = false;
				if(legalisirList.length < limit) {
					isLastPage = true;
				} else {
					isLastPage = false;
				}
			} catch(e) {
				onError(e);
			}
		}, 500);
	}
</script>

<style>
  .dropdown:hover .dropdown-menu {
    display: block;
  }
</style>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		<Sidebar active="e-legalisir" sideBarMenus={SIDEBAR_ADMIN} pathImage="../" />

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			<div class="flex">
				<h1 class="mb-8 text-4xl font-bold">List Legalisir</h1>
				<div class="flex align-center justify-center mb-3 pt-0 ml-6">
					<input
						type="text"
						placeholder="Cari"
						on:input={onSearch}
						class="border-0 px-3 py-1 h-10 border border-solid border-gray-200 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200">
								<thead class="bg-gray-50">
									<tr>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Id
										</th>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											Pengambilan
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
											<div class="text-sm font-medium text-gray-900">
												{legalist.id}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											{#if legalist.isOffline}
											<div class="text-sm text-gray-400">offline</div>
											{:else}
											<div class="text-sm text-green-400">online</div>
											{/if}
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class={`text-sm ${getColoStatus(legalist.status)}`}>{@html getStatus(legalist.status)}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center justify-end">
												{#if usertype == "4"}
													{#if legalist.status === 2}
														<Button isLoading={isLoadingApproved} on:click={() => onApprove(legalist.id)} className="mr-2" bgColor="bg-yellow-300" bgHoverColor="bg-yellow-200" size="small">Accept</Button>
													{/if}
												{:else}
													{#if legalist.status === 1}
														<Button isLoading={isLoadingReject} on:click={() => onReject(legalist.id)} className="mr-2" bgColor="bg-red-500" bgHoverColor="bg-red-400" size="small">Reject</Button>
														<Button isLoading={isLoadingAccept} on:click={() => onAccept(legalist.id)} className="mr-2" bgColor="bg-green-500" bgHoverColor="bg-green-400" size="small">Verify</Button>
													{:else if legalist.status === 2 && legalist.isOffline}
                            <!-- <Button on:click={() => onPrint(legalist)} className="mr-2" bgColor="bg-yellow-500" bgHoverColor="bg-yellow-400" size="small">Print</Button> -->
                            <div class="dropdown inline-block relative">
                              <button class="text-right mr-2 bg-yellow-500 hover:bg-yellow-400 py-1 pl-4 pr-2 text-sm text-white rounded inline-flex items-center">
                                <span class="mr-1">Print</span>
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                              </button>
                              <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                                <li class=""><a on:click="{() => onPrint(legalist.ijazah)}" class="cursor-pointer text-white rounded-t bg-yellow-500 hover:bg-yellow-400 py-2 px-4 block whitespace-no-wrap">Ijazah</a></li>
                                <li class=""><a on:click="{() => onPrint(legalist.transcript)}" class="cursor-pointer text-white rounded-b bg-yellow-500 hover:bg-yellow-400 py-2 px-4 block whitespace-no-wrap">Transkrip</a></li>
                              </ul>
                            </div>
														<Button isLoading={isLoadingApproved} on:click={() => onDone(legalist.id)} className="mr-2" bgColor="bg-green-500" bgHoverColor="bg-green-400" size="small">Done</Button>
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
							{#if !isLoadingTable}
							<div class="min-w-full flex align-center justify-end border-t-2 border-gray-200 pr-4">
								<button
									on:click={onPrevPage}
									class={`"p-4 mr-2" ${page <= 1 ? 'text-gray-200' : 'text-black' }`}
									disabled={page <=1}
								>
									<i class="fas fa-chevron-left"></i>
								</button>
								<button
									on:click={onNextPage}
									class={`p-4 ${isLastPage ? 'text-gray-200' : 'text-black' }`}
									disabled={isLastPage}
								>
									<i class="fas fa-chevron-right"></i>
								</button>
							</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
			
		</main>

	</div>
</div>