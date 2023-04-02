<script lang="ts">
	import { onMount } from 'svelte';
	import { API } from '../../constants';

	type Todo = {
		id: number;
		date: Date;
		text: string;
		completed: boolean;
	};

	let todos: Todo[] = [];
	let newTodo: string = '';

	async function getTodos() {
		const response = await fetch(`${API}/api/todos`);
		todos = await response.json();
	}

	async function addTodo() {
		if (newTodo.trim()) {
			await fetch(`${API}/api/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: newTodo.trim() })
			});

			await getTodos();

			newTodo = '';
		}
	}

	async function toggleTodo(id: number) {
		await fetch(`${API}/api/todos/${id}`, {
			method: 'PATCH'
		});

		await getTodos();
	}

	async function removeTodo(id: number) {
		await fetch(`${API}/api/todos/${id}`, {
			method: 'DELETE'
		});
		await getTodos();
	}

	onMount(() => {
		setTimeout(() => {
			getTodos();
		}, 200);
	});
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
