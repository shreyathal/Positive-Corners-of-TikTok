<script>
	let {changeChoice, choices} = $props();
</script>

<div class="picker">	
	<nav>
		{#each choices as item}
			<a href="#{item}" onclick={() => changeChoice(item)}>{item}</a>
		{/each}
	</nav>
</div>
	
<style>
	.picker {
		display: inline-block;
		border: 1px solid #666;
		padding: 10px;
	}
	a {
		display: inline-block;
		padding: 0px 10px;
	}
</style>