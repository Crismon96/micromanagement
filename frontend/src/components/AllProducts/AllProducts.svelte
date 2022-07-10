<script lang="ts">
  let products;

  let promise = getAllProducts();

  async function getAllProducts() {
    return fetch('http://localhost:8081/api/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const data = await res.json();
      products = data;
    });
  }
</script>

<table>
  {#await promise}
    <p>...waiting</p>
  {:then}
    <thead>
      <td>title</td>
      <td>image</td>
      <td>likes</td>
    </thead>
    {#each products as { title, image, likes }}
      <tr>
        <td>{title}</td>
        <td>
          <img src={image} alt={title} />
        </td>
        <td>{likes}</td>
      </tr>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</table>
