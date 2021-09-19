<script>
  import { navigate } from 'svelte-routing'
  import { ResetPasswordRequest, ChangePasswordRequest } from "../../proto/auth_message_pb"
  import { TracertServicePromiseClient } from '../../proto/tracert_service_grpc_web_pb' 
  import Login from '../services/login'
  import Button from '../components/Button.svelte'
  import Input from '../components/Input.svelte'
  import { PATH_URL } from '../helper/path'
  import { Images } from '../helper/images'
  import logout from '../helper/logout'
  import { notifications } from '../helper/toast';
  import Cookies from 'js-cookie'
  import { onMount } from 'svelte'

  export let id;

  onMount(() => {
    if(id && Cookies.get('token')) {
      navigate(PATH_URL.DASHBOARD, { replace: true })
    }
  })

  let isLoading = false;

  async function resetPasswordCall(){
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient
      }
    }

    const resetPasswordRequest = new ResetPasswordRequest()
    resetPasswordRequest.setToken(id)
    resetPasswordRequest.setNewPassword(state.password)
    resetPasswordRequest.setRePassword(state.confirmPassword)

    let login = new Login(deps, resetPasswordRequest)
    return await login.resetPassword()
  }

  async function changePasswordCall(){
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient
      }
    }

    const changePasswordRequest = new ChangePasswordRequest()
    changePasswordRequest.setOldPassword(state.oldPassword)
    changePasswordRequest.setNewPassword(state.password)
    changePasswordRequest.setRePassword(state.confirmPassword)

    let login = new Login(deps, changePasswordRequest)
    return await login.changePassword()
  }

  // let username = 'rijal.asep.nugroho@gmail.com'
  // let password = 'hariINI@2021'
  let state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  }
  const handleInput = (e) => {
    const { value, name } = e.target
    state[name] = value
  }

  const resetPassword = async () => {
    try {
      if (id) {
        isLoading = true
        const user = await resetPasswordCall()
        isLoading = false;
        notifications.success('Sukses Reset Password. Silahkan Login Menggunakan Password yang baru', 3000);
        navigate(PATH_URL.LOGIN, { replace: true })
      } else {
        isLoading = true
        const user = await changePasswordCall()
        isLoading = false;
        notifications.success('Sukses Mengganti Password. Silahkan Login Menggunakan Password yang baru', 3000)
        logout();
        navigate(PATH_URL.LOGIN, { replace: true })
      }

    } catch(e) {
      isLoading = false;
      notifications.danger(e.message)
    }
  };
  
</script>
<div class="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
  <img class="object-cover w-64 mb-8" src={Images.logo_poltekkes} alt="">
  <p class="mb-6 text-xl text-center w-2/6 text-black">
    Masukkan password baru
  </p>
  <form on:submit|preventDefault={resetPassword} class="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
      {#if !id}
      <Input
        label="Password Lama"
        name="oldPassword"
        on:input={handleInput}
        bind:value={state.oldPassword}
        placeholder="Password Lama"
        type="password"
        required
      />
      {/if}
      <Input
        label="Password Baru"
        name="password"
        on:input={handleInput}
        bind:value={state.password}
        placeholder="Password Baru"
        type="password"
        required
      />
      <Input
        label="Ulang Password Baru"
        name="confirmPassword"
        on:input={handleInput}
        bind:value={state.confirmPassword}
        placeholder="Ulang Password Baru"
        type="password"
        required
      />
      <Button isLoading={isLoading}>{id ? 'Ganti Password' : 'Reset Password'}</Button>
  </form>
</div>