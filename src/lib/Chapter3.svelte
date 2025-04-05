<script>
  import tiktokData from './tiktokdetails';
  import CategoryDetails from './categorydetails.svelte';
  
  // Get all category names as an array
  const categories = Object.keys(tiktokData);
  
  // Initial selected category
  let selectedCategory = $state(null);
  
  // Function to change the selected category
  function selectCategory(category) {
    selectedCategory = category;
  }
  
  // Derived selected category details
  const selectedDetails = $derived(
    selectedCategory ? tiktokData[selectedCategory] : null
  );
</script>

<div class="container">
  <h1>Chapter - 3</h1>
  
  <div class="section">
    <h2>Positive Influence / Happy Side of Tik-tok</h2>
    
    <div class="category-grid">
      <button class="category-button" onclick={() => selectCategory('advice')}>
        <span class="emoji-group">👵👩‍🦳💕</span>
      </button>
      <button class="category-button" onclick={() => selectCategory('fundraising')}>
        <span class="emoji-group">💰❤️🌱</span>
      </button>
      <button class="category-button" onclick={() => selectCategory('deinfluencing')}>
        <span class="emoji-group">👧🚫👑</span>
      </button>
      <button class="category-button" onclick={() => selectCategory('hopecore')}>
        <span class="emoji-group">✨🌈🙏</span>
      </button>
    </div>
    
    {#if selectedDetails && selectedCategory}
      <CategoryDetails 
        title={selectedDetails.title}
        description={selectedDetails.description}
        examples={selectedDetails.examples}
        impact={selectedDetails.impact}
        category={selectedCategory}
      />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0;
  }
  
  h2 {
    font-size: 18px;
    margin: 20px 0;
  }
  
  .section {
    margin: 20px 0;
  }
  
  /* Category grid styles */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .category-button {
    background-color: #3a2222; /* Single color for all buttons */
    border: none;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, opacity 0.2s;
  }
  
  .category-button:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  
  .emoji-group {
    font-size: 24px;
  }
</style>