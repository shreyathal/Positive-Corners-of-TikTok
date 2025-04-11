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
  let videoRefs = [];

  $: selectedDetails = selectedCategory ? tiktokData[selectedCategory] : null;
  let currentSlide = 0;

function selectCategory(category) {
  selectedCategory = category;
  currentSlide = 0;

  // ✅ Create a new Set so Svelte sees the change
  exploredCategories = new Set(exploredCategories).add(category);

  // sessionStorage.setItem('explored_positive_corners', JSON.stringify([...exploredCategories]));

  // Scroll logic (keep as is)
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
          video.currentTime = 0; // optional: reset playback
        }
      }
    });
  }
}

</script>

<div class="container">

  <div class="section">
    <h2 style="margin-top: 100px;">Choose a positive corner of TikTok to explore:</h2>

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
              <button class="carousel-nav prev" on:click={prevSlide}>❮</button>

              {#key selectedCategory}
                <div class="slides-container">
                  <!-- {#each selectedDetails.examples as example, i}
                    <div class="slide {i === currentSlide ? 'active' : ''}">
                      <video 
                        controls 
                        preload="metadata"
                        style="
                          max-height: 500px; 
                          max-width: 300px;
                          height: 450px;
                          width: 300px;
                          border-radius: 12px;"
                      >
                        <source src={example} type="video/mp4" />
                        <track kind="captions" src="" label="English captions" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  {/each} -->
                  {#each selectedDetails.examples as example, i}
                    <div class="slide {i === currentSlide ? 'active' : ''}">
                      <video
                        bind:this={videoRefs[i]}
                        controls
                        preload="metadata"
                        style="max-height: 500px; max-width: 300px; height: 450px; width: 300px; border-radius: 12px;"
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
  width: 400px; 
  height: 680px; 
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  border-radius: 37px; /* ← Add this line */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* optional for depth */
  display: flex; 
  flex-direction: column;
}

  .carousel-container {
  background-color: rgba(255, 255, 255, 0.3); 
  height: 550px;
  width: 350px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 26px; 
  }

  .slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
  position: relative;
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

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: auto;
}

.slides-container {
  flex: 0 1 auto;
  position: relative;
  width: 300px;
  height: auto;
  overflow: hidden;
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

</style>