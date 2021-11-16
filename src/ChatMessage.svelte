<script>
    import {user} from './stores';
    export let text;
    export let photoURL;
    export let uid;
    let messageClass = uid==$user.identities[0].user_id?'sent':'received';
</script>
<div class={`message ${messageClass}`}>
    <img alt="" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
    <p>{text}</p>
  </div>