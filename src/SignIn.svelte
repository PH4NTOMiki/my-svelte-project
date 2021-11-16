<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>
<button on:click={()=>{dispatch('signInWithGoogle')}}>Sign in with Google</button>