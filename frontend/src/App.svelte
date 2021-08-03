<script>
	import { Router, Route } from 'svelte-routing';
	import ProtectedRoute from './ProtectedRoute.svelte';

	import Home from './routes/Home.svelte';
	import Dashboard from './routes/Dashboard.svelte';
	import Kuisioner from './routes/Kuisioner.svelte';
	import Upload from './routes/Upload.svelte';
	import Download from './routes/Download.svelte';
	import Login from './routes/Login.svelte';
	import { PATH_URL } from './helper/path';
</script>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
	@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>

<Router>
	<Route path={PATH_URL.BASE} component={Home} />
	<Route path={PATH_URL.LOGIN} component={Login} />
	<Route path={PATH_URL.KUISIONER} component={Kuisioner} />
	<ProtectedRoute path={PATH_URL.UPLOAD_IJAZAH} component={Upload} />
	<ProtectedRoute path={PATH_URL.DOWNLOAD_IJAZAH} component={Download} />
	<ProtectedRoute path={PATH_URL.DASHBOARD} component={Dashboard} />
</Router>