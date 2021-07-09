<script>
  import { navigate } from 'svelte-routing';
  import { token } from '../stores/token.js';

  const login = () => {
      localStorage.setItem('token', '1');
      token.set(localStorage.getItem('token'));

      navigate('/dashboard', { replace: true });
  };
  let username = '';
  let password = '';
</script>

<h1>👋 Login</h1>
<div>
  <input bind:value={username} placeholder="username"/>
</div>
<div>
  <input type="password" bind:value={password} placeholder="password"/>
</div>
<div>
  <button on:click={login}>Login</button>
</div>