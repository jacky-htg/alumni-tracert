<script>
  import { Route } from 'svelte-routing'
  import accessDenied from './routes/accessDenied.svelte'
  import Cookies from 'js-cookie'

  export let path
  export let component 
</script>

{#if Cookies.get('token')}
  <Route path={path} component={component} />
{:else}
  <Route path={path} component={accessDenied} />
{/if}