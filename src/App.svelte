<script>
import supabase from './db.js';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';
	import { onMount } from 'svelte';
	import { user } from './stores.js';
import { writable } from 'svelte/store';
	
//const user = writable(supabase.auth.currentUser);
/*const mySubscription = supabase
  .from('*')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe();*/

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
  $user = session && session.user ? session.user : null;
  /*if($user){const mySubscription = supabase
  .from('messages')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe();}*/
})


async function signInWithGoogle(params) {
		/*const { user:_user, session:_session, error } = */
		await supabase.auth.signIn({provider: 'google'});
		/*if (error) {
			console.log(error);
			return;
		}
		$user = _user;*/
	}
async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
			return;
		}
		$user = null;
	}
	onMount(()=>{
		console.log("mounted");
		console.log(supabase);
	});
</script>

<div class="App">
	<header>
		<h1>⚛️🔥💬</h1>
        {#if $user}
			<button class="sign-out" on:click={signOut}>Sign Out</button>
		{/if}
	</header>

	<section>
		{#if $user}
			<ChatRoom/>
		{:else}
			<SignIn on:signInWithGoogle={signInWithGoogle}/>
		{/if}
	</section>
</div>

<style>
	
</style>