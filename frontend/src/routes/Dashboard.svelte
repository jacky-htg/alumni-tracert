<script>
  import Sidebar from "../components/Sidebar.svelte";
  import { SIDEBAR_USER, SIDEBAR_ADMIN } from '../helper/path'
  import Cookies from 'js-cookie'
  import { deps } from "../services";
  import KuisionerService from '../services/question';
  import Button from '../components/Button.svelte';
  import { ListInput } from '../../proto/generic_message_pb';
  import errorServiceHandling from '../helper/error_service';
  import { notifications } from '../helper/toast';

  let sideBarMenus = SIDEBAR_USER
  if (Cookies.get('usertype') === "3" || Cookies.get('usertype') === "4") {
    sideBarMenus = SIDEBAR_ADMIN
  }

  async function kuisionerListCall(proto){
    const alumni = new KuisionerService(deps, proto)
    return await alumni.resultList()
	}

  export const fetchDataStream = async () => {
    const listInputProto = new ListInput()
    listInputProto.setSearch('')
    listInputProto.setLimit(10)
    listInputProto.setPage(0)
    const stream = await kuisionerListCall(listInputProto);
    return new Promise((resolve, reject) => {
      let count = 0;
      let data = [];
      stream.on('data', (response) => {
        // console.log('JEMBUT = ', response.toObject().alumni);
        data = [ ...data, response.toObject().alumni];
        if(count >= limit-1) {
          resolve(data);
        } else {
          count++;
        }
      })
      stream.on('status', (status) => {
        if(status.code === 0) {
          resolve(data);
        }
      })
      stream.on('end', () => {
        resolve(data);
        console.log('End stream = ');
      })
      stream.on('error', (e) => {
        console.log('THIS');
        reject(e);
      })
    })
  }

  let isLoadingButton = false;
  const onDownloadExcell = async () => {
    try {
      isLoadingButton = true;
      const result = await fetchDataStream();
      isLoadingButton = false;
    } catch(e) {
      console.log('HERE', e);
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