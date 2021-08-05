<script>
  import { navigate } from 'svelte-routing'
  import { token } from '../stores/token'
  import { LoginInput } from "../../proto/user_message_pb"
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb' 
  import Login from '../services/login'
  import Button from '../components/Button.svelte'
  import Input from '../components/Input.svelte'
  import { PATH_URL } from '../helper/path'
  import { Images } from '../helper/images'

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

    navigate(PATH_URL.DASHBOARD, { replace: true })
  };
</script>
<div class="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
  <img class="object-cover w-64 mb-8" src={Images.logo_poltekkes} alt="">
  <p class="mb-6 text-xl text-black">Selamat datang, silahkan login</p>
  <form on:submit|preventDefault={login} class="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
      <Input label="Username" bind:value={username} placeholder="username" type="text" required/>
      <Input label="Password" bind:value={password} placeholder="password" type="password" required/>
      <Button>Login</Button>
  </form>
</div>