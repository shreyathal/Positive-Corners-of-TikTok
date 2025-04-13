<script>
    import { onMount, tick } from 'svelte';

    export let selectedOption = null;
    export let reflectionAnswer = null;
    let pollResultRef;
    let reflectionRef;
  
    const results = {
      "Less than 1 hour": 37,
      "1-2 hours": 20,
      "2-3 hours": 22,
      "More than 3 hours": 23
    };
  
    const options = Object.keys(results);
    const reflectionOptions = ["Yes", "No"];
  
    onMount(() => {
      const saved = localStorage.getItem('tiktok_poll_answer');
      if (saved && options.includes(saved)) {
        selectedOption = saved;
        animateBars();
      }
  
      const reflectionSaved = localStorage.getItem('tiktok_reflection_answer');
      if (reflectionSaved && reflectionOptions.includes(reflectionSaved)) {
        reflectionAnswer = reflectionSaved;
      }
    });
  
    $: if (selectedOption) {
      runBarAnimation();
    }
  
    async function runBarAnimation() {
      await tick();
      animateBars();
    }
  
    function animateBars() {
      const bars = document.querySelectorAll('.bar-fill');
      bars.forEach(bar => {
        const value = bar.dataset.fill;
        bar.style.width = `${value}%`;
      });
    }
  
    function handleSelect(option) {
      selectedOption = option;
      localStorage.setItem('tiktok_poll_answer', option);
      tick().then(() => {
        pollResultRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  
    function resetPoll() {
      selectedOption = null;
      localStorage.removeItem('tiktok_poll_answer');
    }
  
    function handleReflection(answer) {
      reflectionAnswer = answer;
      localStorage.setItem('tiktok_reflection_answer', answer);
      tick().then(() => {
        reflectionRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  
    function resetReflection() {
      reflectionAnswer = null;
      localStorage.removeItem('tiktok_reflection_answer');
    }
  </script>
  
  <div class="poll-section">
    <h2 bind:this={pollResultRef} class="scroll-anchor">
      {#if selectedOption}
        You are with {results[selectedOption]}% of US teens who<br>
        also use TikTok for "{selectedOption}" per day.
      {:else}
        How much time do you spend on TikTok daily?
      {/if}
    </h2>
  
    {#if !selectedOption}
      <div class="poll-options">
        {#each options as option}
          <button on:click={() => handleSelect(option)}>
            {option}
          </button>
        {/each}
      </div>
    {:else}
      <div class="poll-graph">
        {#each options as option}
          <div class="bar-row">
            <p class="label">{option}: {results[option]}%</p>
            <div class="bar-track">
              <div class="bar-fill" data-fill={results[option]}></div>
            </div>
          </div>
        {/each}
      </div>
      <button class="reset-button" on:click={resetPoll}>
        View poll again
      </button>
    {/if}
  </div>
  
  {#if selectedOption}
    <div class="reflection-section">
      <h2 bind:this={reflectionRef} class="scroll-anchor">
        Do you feel like this is too much<br>
        time to be spending on TikTok?
      </h2>
  
      {#if !reflectionAnswer}
        <div class="poll-options">
          {#each reflectionOptions as option}
            <button on:click={() => handleReflection(option)}>
              {option}
            </button>
          {/each}
        </div>
      {:else}
        <p class="subtitle">
          {#if reflectionAnswer === "Yes"}
            You're not alone in feeling that you are spending too much time on the app. As you scroll this page, explore the positive corners of TikTok that'll transform your scrolling from mindless to meaningful!
          {:else}
            That's great to hear that you've been practicing healthy scrolling habits! Throughout the rest of the page, we outline some of the positive corners of TikTok that you can explore to make your time on the app even more meaningful.
          {/if}
        </p>
        <button class="reset-button" on:click={resetReflection}>
          Change answer
        </button>
      {/if}
    </div>
  {/if}

  <style>

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
    margin: 5rem 1rem 5rem;
  }
  
  .reset-button {
    margin-top: 2rem;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .reset-button:hover {
    background-color: #f39fc9;
    color: black;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 600px;
    margin: 1rem auto 0;
    line-height: 1.5;
  }

  .label {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: white
  }

  .poll-graph {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    max-width: 500px;
    margin: 2rem auto;
  }

  .bar-row {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .bar-track {
    width: 100%;
    height: 24px;
    background-color: rgba(255, 105, 180, 0.15);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    background-color: #ff69b4;
    border-radius: 12px;
    width: 0%;
    transition: width 1s ease;
  }

  .reflection-section {
    text-align: center;
    color: white;
    margin: 4rem 1rem 12rem;
  }

  .scroll-anchor {
    scroll-margin-top: 1.5rem;
  }

  </style>
  
