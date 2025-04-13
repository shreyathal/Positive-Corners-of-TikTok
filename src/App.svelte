<script>
  import IntroVideo from './lib/IntroVideo.svelte';
  import Poll from './lib/Poll.svelte';
  import ScrollerContent from './lib/ScrollerContent.svelte';
	import PositiveCorners from './lib/PositiveCorners.svelte';
  import LastSection from './lib/LastSection.svelte';
  
	let introTitleRef;
  let selectedOption = null;
  let reflectionAnswer = null;
	let showVideo = true;
	let count, index, offset, progress;
</script>

<!-- VIDEO INTRO -->
{#if showVideo}
  <IntroVideo on:end={() => (showVideo = false)} />
{/if}

<!-- TITLE -->
<div class="intro-title" bind:this={introTitleRef}>
  <h1>You Deserve a Kinder Algorithm</h1>
  <p class="subtitle" >
    TikTok is overwhelming. It's addicting, chaotic, and often leaves you feeling worse than when you opened it. But somewhere inside that algorithm, there's a softer side. We invite you to pause, reflect, and discover the ways people are using TikTok to care, uplift, and connect. Let's scroll a little differently.
  </p>
</div>
  
<!-- POLL UI -->
<Poll
  bind:selectedOption 
  bind:reflectionAnswer     
/>

{#if selectedOption && reflectionAnswer}
  <!-- SCROLLER INTRO -->
  <div class="scroller-intro" style="margin-bottom: 150px;">
    <p class="subtitle" style="text-align: left;">
      It's easy to open TikTok for a quick break and just as easy to look up an hour later, wondering where the time went. If you've ever felt caught in that loop, you're not alone. TikTok is designed to keep you engaged: the "For You" page is constantly learning from your behavior, delivering content that's just stimulating enough to make you stay. It's a carefully engineered scroll trap, one that rewards speed, novelty, and emotional intensity over thoughtfulness or balance.
      <br><br><br>
      The content that rises to the top tends to provoke strong emotional reactions: fear, outrage, envy because those are the things that drive views and engagement. This means you are often exposed to a flood of worst-case scenarios, panic-inducing "wellness" trends, and hyper-dramatized interpersonal conflict.
      <br><br><br>
      The result? A digital environment that often feels addictive, even when we're not enjoying it. Before we explore what else the app can be, let's move through the patterns that make TikTok feel overwhelming, manipulative, and hard to escape.
    </p>
  </div>

<!-- SCROLLER CONTENT -->
{#if selectedOption && reflectionAnswer}
  <ScrollerContent 
    bind:count 
    bind:index 
    bind:offset 
    bind:progress
  />
{/if}

<!-- SCROLLER OUTRO -->
  <div class="scroller-outro" style="margin-top: 200px;">
    <p class="subtitle" style="text-align: left;">
      But TikTok is not one thing. Just as it can create anxiety and disconnection, it also holds space for genuine joy, support, and collective care. You'll find creators who show up with vulnerability, humor, and generosity — not for clout, but for community. There are corners of the app where people teach each other how to ask for help, share mental health strategies, challenge beauty standards, and fundraise for strangers in crisis.
      <br><br><br>
      What's remarkable is that these moments cut through — even in an attention economy that doesn't reward slowness or sincerity. They remind us that TikTok's potential isn't limited to spectacle. It can also connect people across difference, surface shared struggles, and amplify small acts of kindness. So before you close the app in frustration, take a second to see what else is out there. Let's step into quieter corners of TikTok that offer authenticity, empathy, and a glimpse of what a more human algorithm might look like.
    </p>
  </div>

<!-- THE FOUR POSITIVE CORNERS -->
<PositiveCorners />

<!-- OUTRO -->
  <div class="outro">
    <p class="subtitle" style="text-align: left;">
      You've reached the end of the page — but hopefully, not the end of thinking about how TikTok shapes what we see and how we feel. Maybe you came here feeling burned out, overstimulated, or unsure about your relationship with the app. Maybe you've recognized your own habits in the loops we described. Or maybe, for the first time in a while, you saw content that made you feel something softer — joy, care, connection.
      <br><br><br>
      The truth is, algorithms don't have values — but we do. And every choice we make while we scroll shapes the experience we're fed. By being intentional about how we engage, by seeking out the good instead of just reacting to the loud, we can carve out kinder corners of even the most chaotic platforms.
      <br><br><br>
      So next time you open TikTok, take a breath. Skip the noise. Save the video that made you feel understood. Comment something generous. Share something helpful. You deserve a feed that nourishes you, not one that drains you. Let this be your gentle reminder that a more human algorithm begins with how we choose to show up.
    </p>
  </div>
{/if}

<!-- CONCLUSION -->
{#if selectedOption && reflectionAnswer}
  <LastSection />
{/if}

<style>

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
    align-items: left;
    min-height: 100vh;
    padding: 0 1rem;
    text-align: center;
    color: white;
    max-width: 700px;
    margin: 0 auto;
  }

</style>