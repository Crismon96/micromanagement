<script lang="ts">
  let title = '';
  let src = '';

  let promise;

  function handleClick() {
    promise = createProduct();
  }

  async function createProduct() {
    return fetch('http://localhost:8081/api/products', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, image: src }),
    }).then(() => {
      title = '';
      src = '';
    });
  }
</script>

<input placeholder="title" bind:value={title} />
<input placeholder="image" bind:value={src} />

<img style:width="150px" style:height="150px" {src} alt={title} />

{#await promise}
  <p>...waiting</p>
{:then res}
  <button type="button" on:click={handleClick}>Add product</button>

  {#if res}
    <p>Product has been added {res}</p>
    <button type="button" on:click={handleClick}>Add another</button>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
