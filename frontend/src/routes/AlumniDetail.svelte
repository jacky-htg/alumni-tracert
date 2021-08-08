<script>
  import Sidebar from "../components/Sidebar.svelte";
  import { navigate } from 'svelte-routing'
  import { PATH_URL, SIDEBAR_ADMIN } from '../helper/path'

  const urlParams = new URLSearchParams(window.location.search);
  if(!urlParams.has('id')) {
    navigate(PATH_URL.LIST_ALUMNI, { replace: true })
  }

  const onBack = () => {
    navigate(PATH_URL.LIST_ALUMNI, { replace: true })
  }
  console.log(urlParams.get('id'));
  // const isBeta = urlParams.has('beta');
</script>

<div>
  <Sidebar active="list-alumni" sideBarMenus={SIDEBAR_ADMIN}/>
  
</div>