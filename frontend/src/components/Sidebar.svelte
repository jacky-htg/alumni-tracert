<script>
  import { link } from 'svelte-routing'
  import { navigate } from 'svelte-routing'
  import { PATH_URL } from '../helper/path'
  import { Images } from '../helper/images'
  import Cookies from 'js-cookie'
  import logoutHelper from '../helper/logout'

  // core components
  let collapseShow = 'hidden'
  function toggleCollapseShow(classes) {
    collapseShow = classes
  }
  const logout = () => {
    logoutHelper()
    
    navigate(PATH_URL.LOGIN, { replace: true })
  }
  export let active;
  export let sideBarMenus = [];
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
      class="pt-12 pb-2 mr-0 uppercase md:block whitespace-nowrap"
      href={PATH_URL.DASHBOARD}
    >
      <img class="object-cover w-64 h-full" src={Images.logo_poltekkes} alt="">
    </a>
    <a
      use:link
      href={PATH_URL.DASHBOARD}
      class={Cookies.get('username') ? "inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap" : "hidden"}
    >
      {#if Cookies.get('username')}Halo {Cookies.get('username')}{/if}
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
              {#if Cookies.get('username')}Halo {Cookies.get('username')}{/if}
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
        {#each sideBarMenus as menu}
        {#if menu.key === 'e-legalisir'}
          {#if Cookies.get('token') && Cookies.get('usertype') !== "2"}
            <li class="items-center">
              <a
                use:link
                class="text-base uppercase py-3 block {active === menu.key ? 'bg-yellow-50 pl-4 rounded font-bold text-blue-700':'pl-4 font-normal text-gray-600'}"
                href={menu.path}
              >
                <i
                  class={`fas ${menu.icon} mr-2 text-sm ${active === menu.key ? 'opacity-75' : 'text-blueGray-300'}`}
                />
                {menu.label}
              </a>
            </li>
          {/if}
        {:else}
          <li class="items-center">
            <a
              use:link
              class="text-base uppercase py-3 block hover {active === menu.key ? 'bg-yellow-50 pl-4 rounded text-blue-700 font-bold':'pl-4 font-normal text-gray-600'}"
              href={menu.path}
            >
              <!-- <i
                class={`fas ${menu.icon} mr-2 text-sm ${active === menu.key ? 'opacity-75' : 'text-blueGray-300'}`}
              /> -->
              {menu.label}
            </a>
          </li>
        {/if}
        {/each}
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      
      <h6
        class="block pt-1 pb-4 text-base font-bold text-blue-700 no-underline uppercase cursor-pointer md:min-w-full"
      >
        {#if Cookies.get('token')}
        <div on:click={logout}>
          Logout
        </div>
        {:else}
        <a href="/login">Login</a>
        {/if}
        
      </h6>
    </div>
  </div>
</nav>