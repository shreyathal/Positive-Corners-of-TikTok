<script>
import Scroller from './Scroller.svelte'; // using your custom file
  
    let count;
    let index;
    let offset;
    let progress;
    let top = 0;
    let threshold = 0.5;
    let bottom = 0.9;
  
    const backgroundImages = [
      '/images/bg1.jpg',
      '/images/bg2.jpg',
      '/images/bg3.jpg',
      '/images/bg4.jpg',
      '/images/bg5.jpg'
    ];
  </script>
  
  <h2 style="color: white; text-align: center; z-index: 999; position: relative;">
    Chapter 2
  </h2>

  <Scroller
    {top}
    {threshold}
    {bottom}
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background" class="background-layer">
      <div
        class="background-image"
        style="background-image: url('{backgroundImages[index] || backgroundImages[0]}');"
      ></div>
      <div class="text-overlay">
        <h2>Positive Corners of TikTok</h2>
      </div>
    </div>
  
    <div slot="foreground" class="scrolling-layer">
      <section><p>Section 1</p></section>
      <section><p>Section 2</p></section>
      <section><p>Section 3</p></section>
      <section><p>Section 4</p></section>
      <section><p>Section 5</p></section>
    </div>
  </Scroller>
  

  <style>
    
    .background-layer {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      z-index: 1;
      transition: background-image 0.6s ease-in-out;
    }
  
    .text-overlay {
      position: relative;
      z-index: 2;
      text-align: center;
      padding-top: 30vh;
      color: white;
      text-shadow: 0 0 10px black;
    }
  
    .scrolling-layer {
      pointer-events: none;
    }
  
    section {
      height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      padding: 1em;
    }
  
    section p {
      max-width: 300px;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 1rem;
      pointer-events: all;
    }
  </style>