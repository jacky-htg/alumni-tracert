<script>
	import { Router, Route } from 'svelte-routing';
	import ProtectedRoute from './ProtectedRoute.svelte';

	import Home from './routes/Home.svelte';
	import Dashboard from './routes/Dashboard.svelte';
	import Login from './routes/Login.svelte';
</script>

<Router>
	<Route path="/" component={Home} />
	<Route path="/login" component={Login} />
	<ProtectedRoute path="/dashboard" component={Dashboard} />
</Router>