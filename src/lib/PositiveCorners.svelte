<script>
  import tiktokData from './tiktokdetails.js';

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

  $: selectedDetails = selectedCategory ? tiktokData[selectedCategory] : null;
  let currentSlide = 0;

  function selectCategory(category) {
    selectedCategory = category;
    currentSlide = 0;
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
</script>

<div class="container">
  <h1>Chapter 3</h1>

  <div class="section">
    <h2>Positive Influence / Happy Side of TikTok</h2>

    <div class="category-grid">
      {#each categories as category}
        <button 
          class="category-button {selectedCategory === category ? 'selected ' + category : ''}" 
          on:click={() => selectCategory(category)}
        >
        <div class="button-content">
          <span class="emoji-group">{emojiMap[category]}</span>
          <span class="category-name {selectedCategory === category ? 'visible' : ''}">
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
      <div class="details" style="background-color: {categoryColors[selectedCategory] || '#f8f8f8'}">
        <h3>{selectedDetails.title}</h3>
        <p><strong>What is it?</strong> {selectedDetails.description}</p>

        {#if selectedDetails.examples.length > 0}
          <div class="carousel-container">
            <h4>Featured Videos</h4>

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

  .category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    max-width: 340px;
    margin: 0 auto;
  }

 
  .category-button {
    background-color: #3a2222;
    border: 5px solid transparent;
    border-radius: 8px;
    padding: 45px;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
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

  .button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
  }

  .category-name {
    font-size: 14px;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: opacity 0.3s, height 0.3s;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .category-name.visible {
    opacity: 1;
    height: auto;
  }

  .emoji-group {
    font-size: 24px;
  }

  .details {
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h3 {
    margin-top: 0;
    color: #3a2222;
  }

  h4 {
    margin: 15px 0 10px 0;
    color: #3a2222;
    text-align: center;
  }

  p {
    margin: 10px 0;
    line-height: 1.4;
    color: black;
  }


  .carousel-container {
    margin: 20px 0;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
  }

  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    height: 300px;
  }

  .carousel-nav {
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    font-size: 16px;
    padding: 0;
  }

  .carousel-nav:hover {
    background: rgba(0, 0, 0, 0.9);
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
    width: 60%;
    height: 90%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px dashed rgba(0, 0, 0, 0.2);
  }

  .placeholder-icon {
    font-size: 24px;
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 8px;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
    padding: 0;
  }

  .indicator.active {
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>