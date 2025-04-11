<script>
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import Scroller from './lib/Scroller.svelte';
	import PositiveCorners from './lib/PositiveCorners.svelte';
  
	let selectedOption = null;
	let pollResultRef;
	let reflectionRef;
	let introTitleRef;
	
	// VIDEO STATE
	let showVideo = true;
	
	const results = {
	  "Less than 1 hour": 37,
	  "1-2 hours": 20,
	  "2-3 hours": 22,
	  "More than 3 hours": 23
	};
  
	const options = Object.keys(results);
  
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
	  
	  console.log("App mounted, video should be playing");
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
  
	let reflectionAnswer = null;
	const reflectionOptions = ["Yes", "No"];
  
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
  
	let count, index, offset, progress;
	let top = 0;
	let threshold = 0.5;
	let bottom = 0.9;
  
	const backgroundImages = [
	  'public/bgnew1.jpg',
	  'public/bgnew2.jpg', 
	  'public/bgnew3.jpg',
	  'public/bgnew4.jpg'
	]; 
	
	// Video ended handler
	function handleVideoEnd() {
	  console.log("Video ended");
	  showVideo = false;
	  tick().then(() => {
	    console.log("Scrolling to title");
	    introTitleRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	  });
	}
</script>

{#if showVideo}
  <div class="video-container">
    <video 
      src="public/intronew.mp4" 
      autoplay
      muted
      playsinline
      on:ended={handleVideoEnd}
    ></video>
  </div>
{/if}
  
<!-- TITLE -->
<div class="intro-title" bind:this={introTitleRef}>
  <h1>You Deserve a Kind Algorithm</h1>
  <p class="subtitle">
    TikTok is overwhelming. It's addicting, chaotic, and often leaves you feeling worse than when you opened it. But somewhere inside that algorithm, there's a softer side. We invite you to pause, reflect, and discover the ways people are using TikTok to care, uplift, and connect. Let's scroll a little differently.
  </p>
</div>
  
<!-- POLL UI -->
<div class="poll-section">
  <h2 bind:this={pollResultRef} class="scroll-anchor">
    {#if selectedOption}
      You are with {results[selectedOption]}% of US teens who<br>also use TikTok for "{selectedOption}" per day.
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
            <div
              class="bar-fill"
              data-fill={results[option]}
            ></div>
          </div>
        </div>
      {/each}
    </div>
    <button class="reset-button" on:click={resetPoll}>View poll again</button>
  {/if}
</div>

{#if selectedOption}
  <!-- REFLECTION POLL -->
  <div class="reflection-section">
    <h2 bind:this={reflectionRef} class="scroll-anchor">
      Do you feel like this is too much<br>time to be spending on TikTok?
    </h2>

    {#if !reflectionAnswer}
      <div class="poll-options">
        {#each reflectionOptions as option}
          <button on:click={() => handleReflection(option)}>{option}</button>
        {/each}
      </div>
    {:else}
      <p class="subtitle">
        {#if reflectionAnswer === "Yes"}
          You're not alone in feeling that you are spending too much time on the app. Throughout the rest of the page, we outline some of the positive corners of TikTok that you can explore to make your time on the app more meaningful.
        {:else if reflectionAnswer === "No"}
          That's great to hear that you've been practicing healthy scrolling habits! Throughout the rest of the page, we outline some of the positive corners of TikTok that you can explore to make your time on the app even more meaningful.
        {/if}
      </p>
      <button class="reset-button" on:click={resetReflection}>Change answer</button>
    {/if}
  </div>
{/if}
  
{#if selectedOption && reflectionAnswer}
  <!-- SCROLLER INTRO -->
  <div class="scroller-intro">
    <p class="subtitle">
      It's easy to open TikTok for a quick break — and just as easy to look up an hour later, wondering where the time went. If you've ever felt caught in that loop, you're not alone. TikTok is designed to keep you engaged: the For You page is constantly learning from your behavior, delivering content that's just stimulating enough to make you stay. It's a carefully engineered scroll trap — one that rewards speed, novelty, and emotional intensity over thoughtfulness or balance. The content that rises to the top tends to provoke strong emotional reactions — fear, outrage, envy — because those are the things that drive views and engagement. This means users are often exposed to a flood of worst-case scenarios, panic-inducing "wellness" trends, and hyper-dramatized interpersonal conflict.
      <br><br><br>
      The result? A digital environment that often feels addictive, even when we're not enjoying it. Before we explore what else the app can be, let's move through the patterns that make TikTok feel overwhelming, manipulative, and hard to escape.
    </p>
  </div>
  
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
          <img src="public/bgnew1.jpg" alt="Background 1" />
        {:else if index === 1}
          <img src="public/bgnew2.jpg" alt="Background 2" />
        {:else if index === 2}
          <img src="public/bgnew3.jpg" alt="Background 3" />
        {:else if index === 3}
          <img src="public/bgnew4.jpg" alt="Background 4" />
        {:else}
          <img src="public/bgnew1.jpg" alt="Default Background" />
        {/if}
      </div>
    </div>

    <div slot="foreground" class="scrolling-layer">
      <section>
        <p>TikTok traps users in a cycle of passive consumption, where hours vanish to endless, bite-sized content.</p>
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
  
  <div class="scroller-outro">
    <p class="subtitle">
      But TikTok is not one thing. Just as it can create anxiety and disconnection, it also holds space for genuine joy, support, and collective care. You'll find creators who show up with vulnerability, humor, and generosity — not for clout, but for community. There are corners of the app where people teach each other how to ask for help, share mental health strategies, challenge beauty standards, and fundraise for strangers in crisis.
      <br><br><br>
      What's remarkable is that these moments cut through — even in an attention economy that doesn't reward slowness or sincerity. They remind us that TikTok's potential isn't limited to spectacle. It can also connect people across difference, surface shared struggles, and amplify small acts of kindness. So before you close the app in frustration, take a second to see what else is out there. Let's step into quieter corners of TikTok that offer authenticity, empathy, and a glimpse of what a more human algorithm might look like.
    </p>
  </div>
  
  <PositiveCorners />

  <div class="outro">
    <p class="subtitle">
      You've reached the end of the page — but hopefully, not the end of thinking about how TikTok shapes what we see and how we feel. Maybe you came here feeling burned out, overstimulated, or unsure about your relationship with the app. Maybe you've recognized your own habits in the loops we described. Or maybe, for the first time in a while, you saw content that made you feel something softer — joy, care, connection.
      <br><br><br>
      The truth is, algorithms don't have values — but we do. And every choice we make while we scroll shapes the experience we're fed. By being intentional about how we engage, by seeking out the good instead of just reacting to the loud, we can carve out kinder corners of even the most chaotic platforms.
      <br><br><br>
      So next time you open TikTok, take a breath. Skip the noise. Save the video that made you feel understood. Comment something generous. Share something helpful. You deserve a feed that nourishes you, not one that drains you. Let this be your gentle reminder that a more human algorithm begins with how we choose to show up.
    </p>
  </div>
{/if}

<style>
  .video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .video-container video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .background-layer {
  position: relative;
  top: 0;
  left: 0;
  width: 60vw; 
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
  max-width: 100vw;
  height: 100%;
  object-fit: cover;
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
    background-color: #ff69b4;
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
  
  .intro-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 1rem;
    text-align: center;
    color: white;
    max-width: 700px;
    margin: 0 auto;
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

  .scroller-outro{
    margin-top: 150px; 
  }

</style>