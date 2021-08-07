<script>
  import { Link } from 'svelte-routing'
  import { token } from '../stores/token.js'

  const logout = () => {
      localStorage.clear()
      token.set(localStorage.getItem('token'))
  }
</script>

<h1>upload</h1>
<h2>
  <Link to="/login" on:click={logout}>Logout</Link>
</h2>