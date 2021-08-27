<script>
  import { navigate } from 'svelte-routing'
  import { ForgotPasswordRequest } from "../../proto/auth_message_pb"
	import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb' 
  import Login from '../services/login'
  import Button from '../components/Button.svelte'
  import Input from '../components/Input.svelte'
  import { PATH_URL } from '../helper/path'
  import { Images } from '../helper/images'
  import { notifications } from '../helper/toast';
  import Cookies from 'js-cookie'
  import { onMount } from 'svelte'
  import { token } from '../stores/token.js';

  onMount(() => {
    if(Cookies.get('token')) {
      navigate(PATH_URL.DASHBOARD, { replace: true })
    }
  })
  let isLoading = false;

  async function forgotPasswordCall(username){
    var deps = {
			proto: {
				TracertClient: TracertServicePromiseClient
			}
		}

    const forgotPasswordRequest = new ForgotPasswordRequest()
    forgotPasswordRequest.setEmail(username)

		let login = new Login(deps, forgotPasswordRequest)
    return await login.forgotPassword()
	}

  // let username = 'rijal.asep.nugroho@gmail.com'
  // let password = 'hariINI@2021'
  let state = {
    username: '',
    success: false,
  }
  const handleInput = (e) => {
    const { value, name } = e.target
    state[name] = value
  }

  const resetPassword = async () => {
    try {
      isLoading = true
      const user = await forgotPasswordCall(state.username)
      isLoading = false;
      state.success = true;

    } catch(e) {
      isLoading = false;
      notifications.danger(e.message)
    }
  };
  
</script>
<div class="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
  <img class="object-cover w-64 mb-8" src={Images.logo_poltekkes} alt="">
  <p class="mb-6 text-xl text-center w-2/6 text-black">
    Silahkan isi email yang terdaftar untuk dikirimkan link untuk reset password
  </p>
  {#if state.success}
    <p class="mt-10 text-md text-center w-2/6 text-black">Link untuk reset password telah dikirimkan ke email {state.username}. Silahkan cek email anda.</p>
  {:else}
    <form on:submit|preventDefault={resetPassword} class="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
        <Input
          label="Email"
          name="username"
          on:input={handleInput}
          bind:value={state.username}
          placeholder="email"
          type="text"
          required
        />
        <Button isLoading={isLoading}>Reset Password</Button>
    </form>
  {/if}
</div>