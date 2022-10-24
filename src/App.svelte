<script>
  const getTodos = function() {
    const p = fetch( '/read', {
      method:'GET' 
    })
    .then( response => response.json() )
    .then( json => {
      console.log(json)
      return json 
    })
 
    return p
  }

  const addTodo = function( e ) {
    const todo = document.querySelector('input').value
	const addr = document.querySelector('#address').value
	const numb = document.querySelector('#number').value

	
	document.querySelector('input').value = 'enter name here'
	document.querySelector('#address').value = 'enter address here'
	document.querySelector('#number').value = 'enter phone here'

    promise = fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:todo, address:addr, number:numb, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
  }
    const del = function( e ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo') }),
      headers: { 'Content-Type': 'application/json' }
    }).then( promise = getTodos() )
  }


  let promise = getTodos()
</script>

<h1>Phonebook</h1>
<form>
<input placeholder="enter name here" type='text' />
<input placeholder="enter address here" id="address" type='text' />
<input placeholder="enter phone number here" id="number" type='text' />
<button on:click={addTodo}>create entry</button>
{#await promise then todos}
  <ul>

  {#each todos as todo}
    <li>{todo.name} at {todo.address} : {todo.number} <input type='button' value="Delete entry" todo={todo.name} on:click={del}></li>
  {/each}

  </ul>
{/await}
</form>



<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: purple;
		font-family: 'Comic Sans MS', cursive;
	}
		h1 {
		text-align:center;
		font-family: 'Comic Sans MS', cursive;
	}
	

</style>