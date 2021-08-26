<script>
    import { Link } from 'svelte-routing'
</script>

<h1>No access 🤕</h1>

<div class="flex items-center justify-center min-h-screen bg-fixed bg-indigo-500 bg-bottom bg-cover error-bg"
	style="background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E);">

	<div class="container">
		<div class="row">
			<div class="text-center col-sm-8 offset-sm-2 text-gray-50 -mt-52">
				<div class="relative ">
				<h1 class="relative font-sans font-bold text-9xl tracking-tighter-less text-shadow">
					<span>4</span><span>0</span><span>3</span></h1>
					<span class="absolute top-0 -ml-12 font-semibold text-gray-300">Oops!</span>
					</div>
				<h5 class="-mt-3 -mr-10 font-semibold text-gray-300">You don't have access to this page</h5>
				<a
					href="/"
					class="px-5 py-3 text-sm font-medium tracking-wider bg-green-400 rounded-full shadow-sm text-gray-50 hover:shadow-lg">
					Go back to home
				</a>
			</div>
		</div>
	</div>
</div>


<style>
	.error-bg {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
	}
	.tracking-tighter-less {
		letter-spacing: -0.75rem;
	}
	.text-shadow {
		text-shadow: -8px 0 0 rgb(102 123 242);
	}
</style>

<h2>
    Go back to <Link to="/">Home page</Link> | <Link to="/login">Login</Link>
</h2>