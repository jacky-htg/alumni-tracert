<script>
  import { Route } from 'svelte-routing'
  import accessDenied from './routes/accessDenied.svelte'
  import Cookies from 'js-cookie'

  export let path
  export let component 
  console.log('token', Cookies.get('token'))
</script>

{#if Cookies.get('token')}
  <Route path={path} component={component} />
{:else}
  <Route path={path} component={accessDenied} />
{/if}