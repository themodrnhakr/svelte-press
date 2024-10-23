<script lang="ts">
	import { enhance } from "$app/forms"
</script>

<h1 class="title">Sign Up</h1>
<form method="post" use:enhance>
	<label for="email" class="heading1">email</label>
	<input type="email" name="email" id="email" /><br />
	<label for="password" class="heading1">password</label>
	<input type="password" name="password" id="password" /><br />
	<button  class="heading2">Continue</button>
</form>
