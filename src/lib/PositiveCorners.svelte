<script>
  import tiktokData from './tiktokdetails.js';
  import { onMount } from 'svelte'; 

  const emojiMap = {
    advice: " 👩‍🦳 💌",
    fundraising: "🤝💸",
    deinfluencing: "🚫🧘",
    hopecore: "🫶✨"
  };

  const categoryColors = {
    advice: "#FF9FBB",
    fundraising: "#8FBE59",
    deinfluencing: "#7D9AF1",
    hopecore: "#F8C622"
  };

  const categories = Object.keys(tiktokData);

  let selectedCategory = null;
  let detailsElement; // Reference to the details div
  let exploredCategories = new Set();

  $: selectedDetails = selectedCategory ? tiktokData[selectedCategory] : null;
  let currentSlide = 0;

  function selectCategory(category) {
  selectedCategory = category;
  currentSlide = 0;

  // Add to explored set
  exploredCategories.add(category);
  sessionStorage.setItem('explored_positive_corners', JSON.stringify([...exploredCategories]));

  // Scroll to details
  setTimeout(() => {
    if (detailsElement) {
      detailsElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 100);
}

  function nextSlide() {
    currentSlide = (currentSlide + 1) % selectedDetails.examples.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + selectedDetails.examples.length) % selectedDetails.examples.length;
  }

  function goToSlide(index) {
    currentSlide = index;
  }

  // On mount, load explored categories from sessionStorage
  onMount(() => {
    const saved = sessionStorage.getItem('explored_positive_corners');
    if (saved) {
      exploredCategories = new Set(JSON.parse(saved));
    }
  });

</script>

<div class="container">

  <div class="section">
    <h2>Choose a positive corner of TikTok to explore:</h2>

    <div class="category-grid">
      {#each categories as category}
        <button 
          class="category-button {selectedCategory === category ? 'selected ' + category : ''}" 
          on:click={() => selectCategory(category)}
        >
        <div class="button-content">
          <span class="emoji-group">{emojiMap[category]}</span>
          <span class="category-name {exploredCategories.has(category) ? 'visible' : ''}">
            {category === 'advice' ? 'Advice From Older Women' : 
             category === 'hopecore' ? 'Hopecore' : 
             category === 'deinfluencing' ? 'Deinfluencing' : 
             category === 'fundraising' ? 'Fundraising' : 
             ''}
          </span>
        </div>
        </button>
      {/each}
    </div>

    {#if selectedDetails}
      <div class="details" 
           style="background-color: {categoryColors[selectedCategory] || '#f8f8f8'}"
           bind:this={detailsElement}>
        <h2 class="corner-title">{selectedDetails.title}</h2>
        <p class="corner-description">{selectedDetails.description}</p>

        {#if selectedDetails.examples.length > 0}
          <div class="carousel-container">
            <h2> Featured Videos</h2>

            <div class="carousel">
              <button type="button" class="carousel-nav prev" on:click={prevSlide}>❮</button>

              <div class="slides-container">
                {#each selectedDetails.examples as example, i}
                  <div class="slide {i === currentSlide ? 'active' : ''}">
                    <div class="video-placeholder">
                      <div class="placeholder-icon">▶️</div>
                      <p>{example}</p>
                    </div>
                  </div>
                {/each}
              </div>

              <button type="button" class="carousel-nav next" on:click={nextSlide}>❯</button>
            </div>

            <div class="carousel-indicators">
              {#each selectedDetails.examples as _, i}
                <button
                  class="indicator {i === currentSlide ? 'active' : ''}"
                  on:click={() => goToSlide(i)}
                  aria-label="Go to slide {i + 1}"
                  aria-current={i === currentSlide}
                ></button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>

  button {
    outline: none;
  }

  .category-button.selected.advice {
    border-color: #FF9FBB;
  }

  .category-button.selected.fundraising {
    border-color: #8FBE59;
  }

  .category-button.selected.deinfluencing {
    border-color: #7D9AF1;
  }

  .category-button.selected.hopecore {
    border-color: #F8C622;
  }

  .category-name.visible {
    opacity: 1;
    height: auto;
  }

  .emoji-group {
    font-size: 55px;
  }

  .details {
  gap: 20px;
  padding: 1rem;
  margin-top: 60px;
  margin-bottom: 60px;
  max-width: 95%; 
  margin-left: auto;
  margin-right: auto;
}

  .carousel-container {
  margin: 20px 0;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  height: 500px; /* Increase the height of the whole container */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  }

  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    height: 150px;
  }

  .slides-container {
    flex: 1;
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide.active {
    opacity: 1;
  }

  .video-placeholder {
  width: 60vw; /* controls actual width */
  height: calc(200px * 16 / 9); /* 9:16 ratio */
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  }

  .indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
    padding: 0;
    margin-top: 15px; 
  }

  .indicator.active {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 500px;
  margin: 0 auto;
  width: 95%;
  margin-top: 30px;
}

.category-button {
  background-color: #000000;
  border: 7px solid transparent;
  border-radius: 8px;
  padding: 30px;
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

.category-name {
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, height 0.3s ease;
  max-width: 100%;
  word-break: break-word;
}

.corner-title {
  font-size: 22px;
  margin: 0 0 0.3rem 0;
  color: black;
}

.corner-description {
  font-size: 16px;
  margin: 0;
  color: black;
  line-height: 1.4;
}

.details h2 {
  color: black;
  font-size: 20px;
  margin-bottom: 0.5rem;
}

</style>