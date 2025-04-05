<script>
    let { title, description, examples, category } = $props();
    
    // Function to get the color based on category
    function getCategoryColor(cat) {
      const colors = {
        advice: "#FF9FBB",
        fundraising: "#8FBE59",
        deinfluencing: "#7D9AF1",
        hopecore: "#F8C622"
      };
      
      return colors[cat] || "#f8f8f8"; // Default to light gray if no match
    }
    
    // Carousel state
    let currentSlide = $state(0);
    const totalSlides = 4; // Number of placeholder slides
    
    // Navigation functions
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    function goToSlide(index) {
      currentSlide = index;
    }
  </script>
  
  <div class="details" style="background-color: {getCategoryColor(category)}">
    <h3>{title}</h3>
    <p><strong>What is it?</strong> {description}</p>
    
    <!-- Video Carousel -->
    <div class="carousel-container">
      <h4>Featured Videos</h4>
      
      <div class="carousel">
        <button type="button" class="carousel-nav prev" onclick={prevSlide} aria-label="Previous slide">❮</button>
        
        <div class="slides-container">
          {#each Array(totalSlides) as _, i}
            <div class="slide {i === currentSlide ? 'active' : ''}">
              <div class="video-placeholder">
                <div class="placeholder-icon">▶️</div>
              </div>
            </div>
          {/each}
        </div>
        
        <button type="button" class="carousel-nav next" onclick={nextSlide} aria-label="Next slide">❯</button>
      </div>
      
      <div class="carousel-indicators">
        {#each Array(totalSlides) as _, i}
          <button 
            type="button"
            class="indicator {i === currentSlide ? 'active' : ''}" 
            onclick={() => goToSlide(i)}
            aria-label="Go to slide {i+1}"
            aria-current={i === currentSlide ? "true" : "false"}
          ></button>
        {/each}
      </div>
    </div>
    
    <p><strong>Examples:</strong> {examples}</p>
  </div>
  
  <style>
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
    
    /* Carousel Styles */
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
      height: 300px; /* Increased height */
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
      width: 60%; /* Reduced width */
      height: 90%; /* Increased height relative to container */
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