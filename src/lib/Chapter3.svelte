<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    // Function to navigate to a category
    function navigateToCategory(category) {
      dispatch('navigate', category);
    }
  </script>
  
  <div class="container">
    <h1>Chapter - 3</h1>
    
    <div class="section">
      <h2>Positive Influence / Happy Side of Tik-tok</h2>
      
      <div class="category-grid">
        <button class="category-button" on:click={() => navigateToCategory('advice')}>
          <span class="emoji-group">👵👩‍🦳💕</span>
        </button>
        <button class="category-button" on:click={() => navigateToCategory('fundraising')}>
          <span class="emoji-group">💰❤️🌱</span>
        </button>
        <button class="category-button" on:click={() => navigateToCategory('deinfluencing')}>
          <span class="emoji-group">👧🚫👑</span>
        </button>
        <button class="category-button" on:click={() => navigateToCategory('hopecore')}>
          <span class="emoji-group">✨🌈🙏</span>
        </button>
      </div>
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
      background-color: #3a2222;
      border: none;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .emoji-group {
      font-size: 24px;
    }
  </style>