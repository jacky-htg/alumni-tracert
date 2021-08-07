<script>
  import { navigate } from 'svelte-routing'
  import { token } from '../stores/token'
  import { userStore } from '../stores/user'
  import { LoginInput } from "../../proto/user_message_pb"
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb' 
  import Login from '../services/login'
  import Button from '../components/Button.svelte'
  import Input from '../components/Input.svelte'
  import { PATH_URL } from '../helper/path'
  import { Images } from '../helper/images'
  import { notifications } from '../helper/toast';
  import Cookies from 'js-cookie'

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

  // let username = 'rijal.asep.nugroho@gmail.com'
  // let password = 'hariINI@2021'
  let state = {
    username: '',
    password: ''
  }
  const handleInput = (e) => {
    const { value, name } = e.target
    state[name] = value
  }

  const login = async () => {
    try {
      const user = await loginCall(state.username, state.password)
      
      localStorage.setItem('token', user.getToken())
      token.set(localStorage.getItem('token'))
      Cookies.set('token', user.getToken())

      localStorage.setItem('user', JSON.stringify(user))
      userStore.set(localStorage.getItem('user'))
      Cookies.set('user', JSON.stringify(user))
      
      await token.set(localStorage.getItem('token'))
      const userType = user.getUserType();
      console.log('USERTYPE = ', userType);
      switch(userType) {
        case 0:
        case 3:
        case 4:
          navigate(PATH_URL.DASHBOARD, { replace: true })
          break;
        default:
          navigate(PATH_URL.UPLOAD_IJAZAH, { replace: true })
      }
    } catch(e) {
      notifications.danger(e.message)
    }
  };
  
</script>
<div class="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
  <img class="object-cover w-64 mb-8" src={Images.logo_poltekkes} alt="">
  <p class="mb-6 text-xl text-black">Selamat datang, silahkan login</p>
  <form on:submit|preventDefault={login} class="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
      <Input label="Username" name="username" on:input={handleInput} bind:value={state.username} placeholder="username" type="text" required/>
      <Input label="Password" name="password" on:input={handleInput} bind:value={state.password} placeholder="password" type="password" required/>
      <Button>Login</Button>
  </form>
</div>