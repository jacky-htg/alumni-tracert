<script>
    import { Link } from 'svelte-routing'
    import { token } from '../stores/token.js'
    import Sidebar from "../components/Sidebar.svelte";

    const logout = () => {
      localStorage.clear()
      token.set(localStorage.getItem('token'))
  }
</script>

<Sidebar location={location}/>
<h1>e-legalisir</h1>
<Link to="/login" on:click={logout}>Logout</Link>