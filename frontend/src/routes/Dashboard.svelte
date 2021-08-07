<script>
  import { Link } from 'svelte-routing'
  import { token } from '../stores/token.js'
  import Sidebar from "../components/Sidebar.svelte";

  const logout = () => {
    localStorage.clear()
    token.set(localStorage.getItem('token'))
  }

</script>

<div>
  <Sidebar location={location}/>
  
</div>