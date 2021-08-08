<script>
	import { Router, Route } from 'svelte-routing';
	import ProtectedRoute from './ProtectedRoute.svelte';
	import Toast from './components/Toast.svelte'
	import Home from './routes/Home.svelte';
	import Dashboard from './routes/Dashboard.svelte';
	import Kuisioner from './routes/Kuisioner.svelte';
	import KesesuaianPekerjaan from './routes/KesesuaianPekerjaan.svelte';
	import KuisionerSudahBekerja from './routes/KuisionerSudahBekerja.svelte';
	import KuisionerLanjutKuliah from './routes/KuisionerLanjutKuliah.svelte';
	import KuisionerBelumBekerja from './routes/KuisionerBelumBekerja.svelte';
	import KuisionerForm from './routes/KuisionerForm.svelte'
	import AlumniRegistration from './routes/AlumniRegistration.svelte'
	import AppraiserRegistration from './routes/AppraiserRegistration.svelte'
	import DetailAlumni from './routes/AlumniDetail.svelte';
	import Upload from './routes/Upload.svelte';
	import Download from './routes/Download.svelte';
	import Login from './routes/Login.svelte';
	import ListAlumni from './routes/list-alumni.svelte';
	import ELegalisir from './routes/e-legalisir.svelte';
	import { PATH_URL } from './helper/path';
	import Cdc from './routes/Cdc.svelte';
	import SapaAlumni from './routes/SapaAlumni.svelte';
	import TentangKami from './routes/TentangKami.svelte';
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
	<Route path={PATH_URL.CDC} component={Cdc} />
	<Route path={PATH_URL.SAPA_ALUMNI} component={SapaAlumni} />
	<Route path={PATH_URL.TENTANG_KAMI} component={TentangKami} />
	<Route path={PATH_URL.ALUMNI_REGISTRATION} component={AlumniRegistration} />
	<Route path={PATH_URL.APPRAISER_REGISTRATION} component={AppraiserRegistration} />
	<ProtectedRoute path={PATH_URL.KUISIONER_FORM} component={KuisionerForm} />
	<!-- 
	<ProtectedRoute path={PATH_URL.KUISIONER_SUDAH_BEKERJA} component={KuisionerSudahBekerja} />
	<ProtectedRoute path={PATH_URL.KUISIONER_LANJUT_KULIAH} component={KuisionerLanjutKuliah} />
	<ProtectedRoute path={PATH_URL.KUISIONER_BELUM_BEKERJA} component={KuisionerBelumBekerja} />
	<ProtectedRoute path={PATH_URL.KESESUAIAN_PEKERJAAN} component={KesesuaianPekerjaan} />
	-->
	<ProtectedRoute path={PATH_URL.UPLOAD_IJAZAH} component={Upload} />
	<ProtectedRoute path={PATH_URL.DOWNLOAD_IJAZAH} component={Download} />
	<ProtectedRoute path={PATH_URL.DASHBOARD} component={Dashboard} />
	<ProtectedRoute path={PATH_URL.ADMIN_ALUMNI} component={ListAlumni} />
	<ProtectedRoute path={PATH_URL.ADMIN_E_LEGALISIR} component={ELegalisir} />
	<ProtectedRoute path={PATH_URL.DETAIL_ALUMNI} component={DetailAlumni} />
</Router>
<Toast />