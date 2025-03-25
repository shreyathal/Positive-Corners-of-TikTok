<script>
	const properties = $props();
	const name = properties.name;
	const description = properties.description;
	const sights = properties.topSites;
</script>

<div class="details">
	<h3>{name} is great</h3>
	<p>{description}</p>
	<p>You should check out the {sights}</p>
</div>

<style>
	.details {
		background-color: #ccc;
		padding: 15px;
	}
</style>