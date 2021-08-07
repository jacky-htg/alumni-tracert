<script>
  import { Route, Link } from 'svelte-routing'
  import accessDenied from './routes/accessDenied.svelte'
  import { token } from './stores/token.js'

  export let path
  export let component
  //console.log($token)

  $: isAuthenticated = $token
</script>

{#if isAuthenticated}
  <Route path={path} component={component} />
{:else}
  <Route path={path} component={accessDenied} />
{/if}