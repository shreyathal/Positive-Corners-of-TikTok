<script>
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import Scroller from './lib/Scroller.svelte';
	import PositiveCorners from './lib/PositiveCorners.svelte';

	let selectedOption = null;

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
			animateBars(); // animate right away if already answered
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
		await tick(); // ✅ Waits for DOM to update
		animateBars(); // ✅ Then triggers the animation
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
		'/images/bg1.jpg',
		'/images/bg2.jpg',
		'/images/bg3.jpg',
		'/images/bg4.jpg',
		'/images/bg5.jpg'
	];
</script>

  <!-- TITLE -->
  <div class="intro-title">
	<h1>You Deserve a Kind Algorithm</h1>
	<p class="subtitle">
	  TikTok is overwhelming. It’s addicting, chaotic, and often leaves you feeling worse than when you opened it. But somewhere inside that algorithm, there’s a softer side. We invite you to pause, reflect, and discover the ways people are using TikTok to care, uplift, and connect. Let’s scroll a little differently.
	</p>
  </div>
  
  <!-- POLL UI -->
  <div class="poll-section">
	<h2>
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

  <!-- REFLECTION POLL -->
<div class="reflection-section">
	<h2>Do you feel like this is too much<br>time to be spending on TikTok?</h2>
  
	{#if !reflectionAnswer}
	  <div class="poll-options">
		{#each reflectionOptions as option}
		  <button on:click={() => handleReflection(option)}>{option}</button>
		{/each}
	  </div>
	{:else}
	  <p class="reflection-response">
		{#if reflectionAnswer === "Yes"}
		You’re not alone in feeling that you are spending too much time on the app.<br>Throughout the rest of the page, we outline some of the positive corners<br>of TikTok that you can explore to make your time on the app more meaningful.
		{:else if reflectionAnswer === "No"}
		That’s great to hear that's you've been practicing healthy scrolling habits!<br>Throughout the rest of the page, we outline some of the positive corners<br>of TikTok that you can explore to make your time on the app even more meaningful.
		{/if}
	  </p>
	  
	  <button class="reset-button" on:click={resetReflection}>Change answer</button>
	{/if}
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
	  <div
		class="background-image"
		style="background-image: url({backgroundImages[index] || backgroundImages[0]});"
	  ></div>
	  <div class="text-overlay">
		<h2>A collage image that has a gap in the middle (to make text readable) that has things from TikTok</h2>
	  </div>
	</div>
  
	<!-- <div slot="foreground" class="scrolling-layer">
	  {#each Array(5) as _, i}
		<section><p>Section {i + 1}</p></section>
	  {/each}
	</div> -->

	<div slot="foreground" class="scrolling-layer">
		<section>
		  <p>
			TikTok’s endless stream of videos, each tailored to be just engaging enough to keep you swiping, traps users in a cycle of passive consumption known as doom scrolling. What begins as a quick break can stretch into hours of content that chips away at attention spans and emotional regulation. The algorithm doesn’t pause to ask if what it’s showing you is making you feel better — it only knows what keeps you scrolling.
		  </p>
		</section>
		<section>
		  <p>
			TikTok creators — knowingly or not — often lean into this, presenting worst-case scenarios, manipulative language, or dramatic storytelling in ways that escalate panic. Whether it’s about global events, health scares, or the supposed dangers of not owning the right products, the app’s quick-hit style means nuance gets flattened in favor of alarm. One minute you’re learning about a new symptom or crisis, and the next you’re being told you urgently need mouth tape, red light masks, ice rollers, or sleep eye patches — all in the name of optimization. Videos that trigger strong emotional reactions, whether fear or FOMO, are more likely to go viral, reinforcing a distorted sense of danger and manufactured necessity.
		  </p>
		</section>
		<section>
		  <p>
			The platform is also rife with interpersonal drama — creators calling each other out, fans picking sides, and comment sections spiraling into chaos. What might’ve once been private disagreements are now public spectacles, made for mass consumption and replay value. From Mikayla Nogueira’s “mascara-gate” to the chaotic unraveling of Taylor Frankie Paul’s marriage, personal content becomes collective content. Much of this drama stems not from critical discourse, but from pettiness, clout-chasing, and a need to feed the content machine.
		  </p>
		</section>
		<section>
		  <p>
			At the heart of all this is a feedback loop. The more you watch — and especially, the more you engage — the more the algorithm feeds you similar content. That means if you linger on a fear-based video, or react to creator drama, TikTok assumes you want more of it. It becomes easy to get sucked into a corner of the app that feels inescapable. Over time, this can shape your perception of reality: making the world seem more hostile, your peers more performative, and your own attention more fragmented.
		  </p>
		</section>
	</div>
	  
  </Scroller>
  
  <PositiveCorners />
  
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
		text-align: center;
		box-sizing: border-box;
	}

	section p {
		max-width: 600px;
		width: 90%; /* fallback to screen width on mobile */
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
	  margin: 3rem 1rem 5rem;
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
  background-color: rgba(255, 105, 180, 0.15); /* light pink */
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

.reflection-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.reflection-options button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reflection-options button:hover {
  background-color: white;
  color: black;
}

.reflection-response {
  margin-top: 1rem;
  font-size: 1.1rem;
}

  </style>