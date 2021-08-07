<script>
  import { link } from 'svelte-routing'
  import { navigate } from 'svelte-routing'
  import { PATH_URL } from '../helper/path'
  import { token } from '../stores/token.js'
  // core components
  let collapseShow = 'hidden'
  function toggleCollapseShow(classes) {
    collapseShow = classes
  }
  const logout = () => {
    localStorage.clear()
    token.set(localStorage.getItem('token'))
    navigate(PATH_URL.LOGIN, { replace: true })
  }
  export let location
</script>

<!-- <nav
  class="relative z-10 flex flex-wrap items-center justify-between flex-initial px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64"
> -->
<nav class="relative inset-0 z-10 flex-none w-full px-6 py-4 bg-white shadow-xl lg:min-h-screen lg:static lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block">
  <div
    class="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap"
  >
    <button
      class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
      type="button"
      on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
    >
      <i class="fas fa-bars"></i>
    </button>
    <a
      use:link
      class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
      href={PATH_URL.DASHBOARD}
    >
      Dashboard
    </a>
    <!-- Collapse -->
    <div
      class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
    >
      <!-- Collapse header -->
      <div
        class="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
              href={PATH_URL.DASHBOARD}
            >
              Dashboard
            </a>
          </div>
          <div class="flex justify-end w-6/12">
            <button
              type="button"
              class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
              on:click={() => toggleCollapseShow('hidden')}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />

      <ul class="flex flex-col list-none md:flex-col md:min-w-full">
        <li class="items-center">
          <a
            use:link
            href="/admin/list-alumni"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/list-alumni') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-user-circle mr-2 text-sm {location.href.indexOf('/admin/list-alumni') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            List Alumni
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/e-legalisir"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/e-legalisir') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-address-card mr-2 text-sm {location.href.indexOf('/admin/e-legalisir') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            List e-legalisir
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      
      <h6
        class="block pt-1 pb-4 text-xs font-bold text-red-500 no-underline uppercase cursor-pointer md:min-w-full"
      >
        <div on:click={logout}>
          Logout
        </div>
        
      </h6>
    </div>
  </div>
</nav>