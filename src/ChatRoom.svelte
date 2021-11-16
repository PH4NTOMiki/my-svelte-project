<script>
import supabase from './db.js';
import {user,subscription} from './stores.js';
import { onMount } from 'svelte';
import ChatMessage from './ChatMessage'
	let messages = [];//await supabase.from('messages').select().order('createdAt', { ascending: false }).limit(10);
	console.log(messages);
	let val = '';

	(async() => {
		let {data} = await supabase.from('messages').select().order('createdAt', { ascending: false }).limit(10);
		messages = data.reverse();
		console.log(messages);
	})();

	user.subscribe((_user)=>{
		if(_user && !$subscription){
			$subscription= supabase.from('messages').on('INSERT', (data)=>{
				if(data.new){
					messages = [...messages,data.new];
					document.getElementById('dummy').scrollIntoView();
				}
			}).subscribe();
		}
	});

	async function sendMessage(ev) {
		ev.preventDefault();
		await supabase.from('messages').insert({
			text: val,
			photoURL: $user.user_metadata.avatar_url,
			uid: $user.identities[0].user_id
		});
		val = '';
	}
</script>
<main>

	<!--{#if messages && messages.length}-->
		{#each messages as message}
			<ChatMessage {...message}/>
		{/each}
	<!--{/if}-->

	<span id="dummy"></span>

</main>

  <form on:submit={sendMessage}>

	<input bind:value={val} placeholder="say something nice" />

	<button type="submit" disabled={!val}>🕊️</button>

  </form>