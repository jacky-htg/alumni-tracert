<script>
  import Sidebar from "../components/Sidebar.svelte";
  import { SIDEBAR_USER, SIDEBAR_ADMIN } from '../helper/path'
  import Cookies from 'js-cookie'

  let sideBarMenus = SIDEBAR_USER
  if (Cookies.get('usertype') === "3" || Cookies.get('usertype') === "4") {
    sideBarMenus = SIDEBAR_ADMIN
  } 
</script>

<div>
  <Sidebar active=""  sideBarMenus={sideBarMenus}/>
  
</div>