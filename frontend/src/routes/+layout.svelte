<script>
	import { onMount } from 'svelte';

	if (import.meta.env.DEV) {
		onMount(async () => {
			const { worker } = await import('../mock/browser');
			worker.start();
		});
	}
</script>

<slot />
