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
  let detailsElement; 
  let exploredCategories = new Set();
  let videoRefs = [];
  let gridRef;
  let headingRef;
  let gridScrollAnchor;
  export let nextSectionRef;


  $: selectedDetails = selectedCategory ? tiktokData[selectedCategory] : null;
  let currentSlide = 0;

  function selectCategory(category) {
    selectedCategory = category;
    currentSlide = 0;
    exploredCategories = new Set(exploredCategories).add(category);

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

  $: {
    if (videoRefs.length > 0) {
      videoRefs.forEach((video, index) => {
        if (video) {
          if (index === currentSlide) {
            video.play().catch(e => console.warn("Autoplay blocked", e));
          } else {
            video.pause();
            video.currentTime = 0; 
          }
        }
      });
    }
  }

  async function collapseDetails() {
    if (nextSectionRef) {
      // Wait for scroll to finish using a Promise
      await new Promise((resolve) => {
        nextSectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(resolve, 800); // Allow scroll to complete visually (tweak timing as needed)
      });
    }

    // Collapse only after scroll is done
    selectedCategory = null;
  }

  function handleExploreOtherCorners() {
    const currentVideo = videoRefs[currentSlide];
    if (currentVideo) {
      currentVideo.pause();
    }

    // Scroll to the invisible anchor *above* the grid
    gridScrollAnchor?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

</script>

<div class="container" style="margin-bottom: 150px;">

  <div class="section">
    <!-- <h2 style="margin-top: 150px;" bind:this={headingRef} class="scroll-anchor">Choose a positive corner of TikTok to explore:</h2> -->
    <div class="category-scroll-anchor" bind:this={gridScrollAnchor}></div>
    <h2 style="margin-top: 150px;" bind:this={headingRef}>Choose a positive corner of TikTok to explore:</h2>
    
    <div class="category-grid" bind:this={gridRef}>
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
      <div class="details scroll-anchor"
           style="background-color: {categoryColors[selectedCategory] || '#f8f8f8'}"
           bind:this={detailsElement}>
        <h2 class="corner-title">{selectedDetails.title}</h2>
        <p class="corner-description">{selectedDetails.description}</p>

        {#if selectedDetails.examples.length > 0}
        <div class="carousel">
          <button class="carousel-nav prev" on:click={prevSlide}>❮</button>

          {#key selectedCategory}
            <div class="slides-container">
              {#each selectedDetails.examples as example, i}
                <div class="slide {i === currentSlide ? 'active' : ''}">
                  <video
                    bind:this={videoRefs[i]}
                    controls
                    preload="metadata"
                    style="
                          height: 570px;
                          max-width: 100%;
                          border-radius: 30px;"
                  >
                    <source src={example} type="video/mp4" />
                    <track kind="captions" src="" label="English captions" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              {/each}
            </div>
          {/key}

          <button class="carousel-nav next" on:click={nextSlide}>❯</button>
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

        <div class="details-buttons">
          <button on:click={handleExploreOtherCorners}>
            Explore Other Corners
          </button>
          
          <button on:click={collapseDetails}>
            Collapse TikToks
          </button>
        </div>
        
      {/if}
      </div>
    {/if}
  </div>
</div>

<style>

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
  }

  .emoji-group {
    font-size: 55px;
  }

  .details {
    gap: 5px;
    padding: 0.7rem;
    width: 400px;   
    height: 820px; 
    margin-left: auto;
    margin-right: auto; 
    align-items: center;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    transform: scale(0.9);
   
  }

  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 0.25rem;
  }

  .slides-container {
    flex: 0 1 auto;
    position: relative;
    width: 350px;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide {
    position: absolute;
    display: none;  
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .slide.active {
    display: flex; 
    position: relative;
  }

  .indicator {
    width: 20px;
    height: 20px;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
    padding: 0;
    margin-top: 25px; 
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
    margin-top: 50px;
    margin-bottom: 100px;
  }

  .category-button {
    background-color: #000000;
    border: 7px solid transparent;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
  }

  .category-button:hover {
    background-color: #61636a;
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

  .corner-description {
    font-size: 17px;
    margin: 0;
    color: black;
    line-height: 1.4;
    margin: 0 1.5rem 0.5rem 1.5rem; 
  }

  .details h2 {
    color: black;
    font-size: 22px;
    margin-bottom: 0.5rem;
  }

  .carousel-nav {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    user-select: none;
    color: black;
  }

  .scroll-anchor {
    scroll-margin-top: 20px;
  }

  .details-buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .carousel-nav.prev {
    margin-right: -9px;
  }

  .carousel-nav.next {
    margin-left: -9px;
  }

  .details-buttons button {
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .details-buttons button:hover {
    background-color: #61636a;
    color: white;
  }

  .details-buttons {
    margin-top: 25px;
  }

  .category-scroll-anchor {
    position: relative;
    top: 20px; 
    height: 1px;
  }

</style>