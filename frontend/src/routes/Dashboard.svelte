<script>
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb'
  import Sidebar from "../components/Sidebar.svelte";
  import { SIDEBAR_USER, SIDEBAR_ADMIN } from '../helper/path'
  import Cookies from 'js-cookie'
  import KuisionerService from '../services/question';
  import Button from '../components/Button.svelte';
  import { ListInput } from '../../proto/generic_message_pb';
  import errorServiceHandling from '../helper/error_service';
  import { notifications } from '../helper/toast';
  import {saveAs} from 'file-saver';
  import * as excelJS from "exceljs";
  import moment from 'moment'

  let sideBarMenus = SIDEBAR_USER
  if (Cookies.get('usertype') === "3" || Cookies.get('usertype') === "4") {
    sideBarMenus = SIDEBAR_ADMIN
  }

  async function kuisionerListCall(proto){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}
    const kuisioner = new KuisionerService(deps, proto)
    return await kuisioner.resultList()
	}

  export const fetchDataStream = async () => {
    const listInputProto = new ListInput()
    listInputProto.setSearch('')
    listInputProto.setLimit(0)
    listInputProto.setPage(0)
    const stream = await kuisionerListCall(listInputProto);
    return new Promise((resolve, reject) => {
      let data = [];
      stream.on('data', (response) => {
        data = [ ...data, response.toObject().alumni];
      })
      stream.on('status', (status) => {
        if(status.code === 0) {
          resolve(data);
        }
      })
      stream.on('end', () => {
        resolve(data);
      })
      stream.on('error', (e) => {
        reject(e);
      })
    })
  }

  let isLoadingButton = false;
  const onDownloadExcell = async () => {
    try {
      isLoadingButton = true;
      const result = await fetchDataStream();
      const workbook = new excelJS.Workbook();

      let sheet = workbook.addWorksheet("Hasil Kuisioner");
      // title
      sheet.getRow(1).values = [];
      // style
      /* sheet.columns = [
        { key: "category", width: 30 },
      ]; */
      // data
      sheet.addRows([]);
      
      let buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: "applicationi/xlsx" });
      saveAs(blob, `Report_Kuisioner_${moment().format('DD/MM/YYYY')}`);
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
    <Sidebar active=""  sideBarMenus={sideBarMenus}/>
    <main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
      <h1 class="mb-12 text-4xl font-bold">Aplikasi Anter Poltekkes Kemenkes Medan</h1>
      <p>Selamat datang ALUMNI di aplikasi ANTER Poltekkes Kemenkes Medan</p>
      <p>Aplikasi ini membantu alumni untuk melakukan legalisir secara online.</p>
      <div class="mt-8">
        <Button
          on:click={onDownloadExcell}
          isLoading={isLoadingButton}
        >
          Download Excell Hasil Kuisioner
        </Button>
      </div>
    </main>
  </div>
</div>