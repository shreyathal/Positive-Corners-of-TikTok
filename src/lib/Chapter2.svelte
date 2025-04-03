<!-- <script>

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
  </script> -->

  <script>
    import { onMount } from 'svelte';
    import Scroller from './Scroller.svelte';
  
    let selectedOption = null;
  
    const results = {
      "Less than 1 hour": 15,
      "1-2 hours": 70,
      "3-4 hours": 10,
      "5+ hours": 5
    };
  
    const options = Object.keys(results);
  
    // read saved choice on mount
    onMount(() => {
      const saved = localStorage.getItem('tiktok_poll_answer');
      if (saved && options.includes(saved)) {
        selectedOption = saved;
      }
    });
  
    function handleSelect(option) {
      selectedOption = option;
      localStorage.setItem('tiktok_poll_answer', option);
    }
  
    function resetPoll() {
      selectedOption = null;
      localStorage.removeItem('tiktok_poll_answer');
    }
  
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
  
  <!-- POLL UI -->
  <!-- POLL UI -->
<div class="poll-section">
  <h2>How much time do you spend on TikTok daily?</h2>

  {#if !selectedOption}
    <div class="poll-options">
      {#each options as option}
        <button on:click={() => handleSelect(option)}>
          {option}
        </button>
      {/each}
    </div>
  {:else}
    <p class="poll-summary">
      You are with {results[selectedOption]}% of TikTok users who also use the app for "{selectedOption}" per day.
    </p>
    <div class="poll-graph">
      {#each options as option}
        <div class="bar">
          <p>{option}</p> <!-- label first -->
          <div
            class="fill"
            style="height: {results[option]}%; background-color: {option === selectedOption ? '#ff69b4' : '#ccc'}"
          >
            <span>{results[option]}%</span>
          </div>
        </div>
      {/each}
    </div>    

    <button class="reset-button" on:click={resetPoll}>View poll again</button>
  {/if}
</div>
  
  <h2 style="color: white; text-align: center; z-index: 999; position: relative;">
    Chapter 2
  </h2>

  <p> This is a small intro paragraph to talk about the "bad" corners of TikTok</p>

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
        <h2> A collage image that has a gap in the middle (to make text readable) that has things from TikTok </h2>
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

    .poll-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      max-width: 400px;
      margin: 2rem auto;
    }

    .poll-section {
      text-align: center;
      color: white;
      margin: 3rem 1rem 5rem; /* added bottom spacing */
    }

    .reset-button {
      margin-top: 2rem;
      background-color: transparent;
      border: 2px solid white;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .reset-button:hover {
      background-color: white;
      color: black;
    }

  </style>