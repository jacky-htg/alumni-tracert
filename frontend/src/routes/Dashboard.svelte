<script>
  import Sidebar from "../components/Sidebar.svelte";
  import { SIDEBAR_USER, SIDEBAR_ADMIN } from '../helper/path'
  import Cookies from 'js-cookie'

  let sideBarMenus = SIDEBAR_USER
  if (Cookies.get('usertype') === "3" || Cookies.get('usertype') === "4") {
    sideBarMenus = SIDEBAR_ADMIN
  }
</script>

<div class="w-full mx-auto max-w-8xl">
	<div class="lg:flex">
    <Sidebar active=""  sideBarMenus={sideBarMenus}/>
    <main class="flex-auto w-full min-w-0 px-20 pt-12 lg:static lg:max-h-full lg:overflow-visible">
      <h1 class="mb-12 text-4xl font-bold">Aplikasi Anter Poltekkes Kemenkes Medan</h1>
      <p>Selamat datang ALUMNI di aplikasi ANTER Poltekkes Kemenkes Medan</p>
      <p>Aplikasi ini membantu alumni untuk melakukan legalisir secara online.</p>
    </main>
  </div>
</div>