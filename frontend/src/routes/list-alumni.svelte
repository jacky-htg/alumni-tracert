<script>
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import Sidebar from '../components/Sidebar.svelte'
  import { debounce } from '../helper/commons'
	import { ListInput } from '../../proto/generic_message_pb'
  import AlumniService from '../services/alumniList'
  import { onMount } from 'svelte'
  import { notifications } from '../helper/toast'
	import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'
	import Cookies from 'js-cookie'
	import errorServiceHandling from '../helper/error_service'
	import UserAnswerService from '../services/user_answer';
  import Button from '../components/Button.svelte';
	import {saveAs} from 'file-saver';
  import * as excelJS from "exceljs";
  import moment from 'moment'

	let search = '';
	let limit = 10;
	let page = 0;
  let alumniList = [];
	let isLoadingTable = false;
	let isLastPage = false;
	const usertype = Cookies.get('usertype');
  
  async function alumniListCall(proto){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const alumni = new AlumniService(deps, proto)
    return await alumni.alumniList()
	}

	const fetchData = async () => {
		const listInputProto = new ListInput();
		listInputProto.setSearch(search);
		listInputProto.setLimit(limit);
		listInputProto.setPage(page);
		const alumniStream = await alumniListCall(listInputProto);
		return new Promise((resolve, reject) => {
			let count = 0;
			let data = [];
			alumniList = [];
			alumniStream.on('data', (response) => {
				alumniList = [ ...alumniList, response.toObject().alumni];
				data = [ ...data, response.toObject().alumni];
				if(count >= limit-1) {
					resolve(data);
				} else {
					count++;
				}
			})
			alumniStream.on('status', (status) => {
				if(status.code === 0) {
					resolve(data);
				}
			})
			alumniStream.on('end', () => {
				resolve(data);
			})
			alumniStream.on('error', (e) => {
				reject(e);
			})
		})
	}

	const onError = (e) => {
		isLoadingTable = false;
		errorServiceHandling(e)
		if (Cookies.get('token') == null) {
			location = PATH_URL.LOGIN  
		} 
		notifications.danger(e.message)
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
				if(alumniList.length < limit) {
					isLastPage = true;
				}
			}
    } catch(e) {
			onError(e);
    }
	})

	const onNextPage = async () => {
		try {
			page++;
			isLoadingTable = true;
			await fetchData();
			isLoadingTable = false;
			if(alumniList.length < limit) {
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
				if(alumniList.length < limit) {
					isLastPage = true;
				} else {
					isLastPage = false;
				}
			} catch(e) {
				onError(e);
			}
		}, 500);
	}

	async function traceListCall(proto){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}
    const userAnswer = new UserAnswerService(deps, proto)
    return await userAnswer.list()
	}

  export const fetchDataStream = async () => {
    const listInputProto = new ListInput()
    listInputProto.setSearch('')
    listInputProto.setLimit(0)
    listInputProto.setPage(0)
    const stream = await traceListCall(listInputProto);
    return stream.toObject().answerList;
  }

  const getWidthExcell = (id) => {
    switch(id) {
      case 0:
        return 6
      case 1:
        return 30
      default:
        return 60
    }
  }

  const clean = (input) => {
    if(typeof input != 'string') {
      return input;
    }
    return input.replace(/^\s+|\s+$/gm,'');
  }

  let isLoadingButton = false;
  const onDownloadExcell = async () => {
    try {
      isLoadingButton = true;
      const result = await fetchDataStream();
      const workbook = new excelJS.Workbook();

      let sheet = workbook.addWorksheet("Hasil Kuisioner");
      // title
      const title = result[0].answerList.map((answer) => clean(answer.question))
      title.unshift('id', 'name');
      title.push('created_at')
      // header
      sheet.columns = title.map((a, idx) => ({
        header: a,
        key: a,
        width: getWidthExcell(idx),
      }));
      const dataRow = result.map((answer) => [answer.id, answer.name, ...(answer.answerList.map((a) => a.answer)), answer.created])
      // data
      const mergeDataWithColumn = dataRow.map((row, idx) => {
        const  obj = {};
        row.forEach((a, id) => {
          obj[title[id]] = clean(a);
        })
        return obj;
      })
      
      sheet.addRows(mergeDataWithColumn);
      var borderStyles = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      // style
      sheet.eachRow({ includeEmpty: true }, function(row, rowIdx) {
        row.eachCell({ includeEmpty: true }, function(cell) {
          if (rowIdx == 1) {
            cell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'C7C7C7'}
            };
            cell.font = { bold: true }
          }
          cell.border = borderStyles;
        });
      });
      let buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: "applicationi/xlsx" });
      saveAs(blob, `Report_Kuisioner_${moment().format('DD/MM/YYYY')}.xlsx`);
      isLoadingButton = false;
    } catch(e) {
      isLoadingButton = false;
      errorServiceHandling(e)
      if (Cookies.get('token') == null) {
        location = PATH_URL.LOGIN  
      } 
      notifications.danger(e.message)
    }
  }
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
		<Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN} pathImage="../" />

		<main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
			<div class="flex justify-between items-center mb-8">
				<div class="flex items-center">
					<h1 class="text-4xl font-bold">List Alumni</h1>
					<div class="flex align-center justify-center pt-0 ml-6">
						<input
							type="text"
							placeholder="Cari"
							on:input={onSearch}
							class="border-0 px-3 py-1 h-10 border border-solid border-gray-200 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
						/>
					</div>
				</div>
				<div class="ml-4">
					<Button
						on:click={onDownloadExcell}
						isLoading={isLoadingButton}
					>
						Download Excell Kuisioner
					</Button>
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
											Nama
										</th>
										<th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
											NIK
										</th>
										<th scope="col" class="relative px-6 py-3">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each alumniList as alumni}
									<tr>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900">
														{alumni.name}
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-900">{alumni.nik}</div>
										</td>
										<td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<a href={`${PATH_URL.ADMIN_ALUMNI_DETAIL}?id=${alumni.id}`} class="text-indigo-600 hover:text-indigo-900">View profile</a>
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