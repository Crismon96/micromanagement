<script lang="ts">
	type Todo = {
		id: number;
		date: number;
		text: string;
		completed: boolean;
	};

	let todos: Todo[] = [];
	let newTodo = '';

	function addTodo() {
		if (newTodo.trim()) {
			todos = [
				...todos,
				{ id: Math.random() * 100, date: Date.now(), text: newTodo.trim(), completed: false }
			];
			newTodo = '';
		}
	}

	function toggleTodo(id: number) {
		todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
	}

	function removeTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<div>
	<h1>Todo List</h1>
	<input
		type="text"
		placeholder="Add a new task"
		bind:value={newTodo}
		on:keyup={(e) => e.key === 'Enter' && addTodo()}
	/>
	<button on:click={addTodo}>Add Todo</button>
	<ul>
		{#each todos as todo}
			<li class={todo.completed ? 'completed' : ''}>
				<input type="checkbox" checked={todo.completed} on:change={() => toggleTodo(todo.id)} />
				<span>{todo.text}</span>
				<button on:click={() => removeTodo(todo.id)}>Remove</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.completed {
		text-decoration: line-through;
	}
</style>
