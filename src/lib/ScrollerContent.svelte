<script>
  import Scroller from './Scroller.svelte';
  
  export let top = 0;
  export let threshold = 0.5;
  export let bottom = 0.9;
  export let count;
  export let index;
  export let offset;
  export let progress;
</script>

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
    <div class="background-image">
      {#if index === 0}
        <img src="public/bgnew1.png" alt="Background 1" />
      {:else if index === 1}
        <img src="public/bgnew2.png" alt="Background 2" />
      {:else if index === 2}
        <img src="public/bgnew3.png" alt="Background 3" />
      {:else if index === 3}
        <img src="public/bgnew4.png" alt="Background 4" />
      {:else}
        <img src="public/bgnew1.png" alt="Default Background" />
      {/if}
    </div>
  </div>
  
  <div slot="foreground" class="scrolling-layer">
    <section>
      <p>TikTok traps you in a cycle of passive consumption, where hours vanish to endless, bite-sized content.</p>
    </section>
    <section>
      <p>Dramatic, fear-based videos rise to the top — not because they're true, but because they're addictive.</p>
    </section>
    <section>
      <p>Personal drama becomes public spectacle, feeding a content machine that thrives on conflict.</p>
    </section>
    <section>
      <p>Engagement creates a feedback loop: the more you react, the more chaos the algorithm sends your way.</p>
    </section>
  </div>
</Scroller>

<style>
 
  
  /* Keep original desktop styles exactly as they were */
  .background-layer {
    position: relative;
    top: 0;
    left: 0;
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }
  
  .background-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .background-image img {
    max-width: 100%; /* Changed from 100vw to 100% */
    height: 100%;
    object-fit: cover;
    object-position: 60% center !important;
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
    text-align: center;
    box-sizing: border-box;
  }
  
  section p {
    max-width: 600px;
    width: 90%;
    font-size: 1.2rem;
    line-height: 1.6;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1.5rem;
    border-radius: 12px;
    pointer-events: all;
    margin: 0 auto;
    word-break: break-word;
  }
  
  /* Mobile adjustments with proper width handling */
  @media (max-width: 768px) {

  .background-layer {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
    background: none !important; /* just in case background color is pushing it */
  }

  .background-image {
    width: 100vw !important;
    height: 100vh !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .background-image img {
    width: 100vw !important;
    height: 100vh !important;
    object-fit: cover !important;
    object-position: center center !important;
  }
}
</style>