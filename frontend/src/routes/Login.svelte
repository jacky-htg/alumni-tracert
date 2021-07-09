<script>
  import { navigate } from 'svelte-routing'
  import { token } from '../stores/token'
  import { LoginInput } from "../../proto/user_message_pb"
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb' 
  import Login from '../services/login'

  async function loginCall(username, password){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const loginInput = new LoginInput()
    loginInput.setEmail(username)
    loginInput.setPassword(password)

		let login = new Login(deps, loginInput)
    return await login.login()
	}

  let username = 'rijal.asep.nugroho@gmail.com'
  let password = 'hariINI@2021'
  const login = () => {
    const user = loginCall(username, password)
    console.log(user)
    localStorage.setItem('token', user.token)
    token.set(localStorage.getItem('token'))

    navigate('/dashboard', { replace: true })
  };
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