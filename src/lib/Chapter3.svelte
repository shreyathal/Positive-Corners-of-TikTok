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
      <button class="category-button advice-button" onclick={() => selectCategory('advice')}>
        <span class="emoji-group">👵👩‍🦳💕</span>
      </button>
      <button class="category-button fundraising-button" onclick={() => selectCategory('fundraising')}>
        <span class="emoji-group">💰❤️🌱</span>
      </button>
      <button class="category-button deinfluencing-button" onclick={() => selectCategory('deinfluencing')}>
        <span class="emoji-group">👧🚫👑</span>
      </button>
      <button class="category-button hopecore-button" onclick={() => selectCategory('hopecore')}>
        <span class="emoji-group">✨🌈🙏</span>
      </button>
    </div>
    
    {#if selectedDetails && selectedCategory}
      <CategoryDetails 
        title={selectedDetails.title}
        description={selectedDetails.description}
        examples={selectedDetails.examples}
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
    border: none;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3a2222; /* Default color */
  }

  .advice-button {
    background-color: #FF9FBB;
  }
  
  .fundraising-button {
    background-color: #4ecdc4;
  }
  
  .deinfluencing-button {
    background-color: #6c88c4;
  }
  
  .hopecore-button {
    background-color: #c16ecf;
  }
  
  .emoji-group {
    font-size: 24px;
  }
</style>