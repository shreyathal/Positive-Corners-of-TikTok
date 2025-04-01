<script>
    // @ts-ignore
    import { Scroller, Step } from '@sveltejs/svelte-scroller';
    import LoremIpsum from './LoremIpsum.svelte';
  
    const steps = [
      "This is a space for joy.",
      "For kindness and care.",
      "For creativity and connection.",
      "And for small moments that spark happiness."
    ];
  </script>
  
  <style>
    .chapter-container {
      position: relative;
      background: url('/chapter2-bg.png') no-repeat center center;
      background-size: cover;
      height: 100vh;
      overflow: hidden;
    }
  
    .step-content {
      font-size: 2rem;
      background: rgba(255, 255, 255, 0.9);
      margin: 2rem;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 600px;
      text-align: center;
    }
  </style>
  
  <div class="chapter-container">
    <Scroller let:currentStep>
      {#each steps as step, index}
        <Step>
          <div class="step-content">
            <h2>{step}</h2>
            <LoremIpsum />
          </div>
        </Step>
      {/each}
    </Scroller>
  </div>
  