<script>
    import { tick, createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    let videoElement;
  
    function handleVideoEnd() {
      dispatch('end');
      tick().then(() => {
        const titleSection = document.querySelector('.intro-title');
        titleSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  </script>
  
  <div class="video-container">
    <video 
      bind:this={videoElement}
      src="/positive-TikTok/intronew.mp4" 
      autoplay
      muted
      playsinline
      on:ended={handleVideoEnd}
    ></video>
  </div>
  
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
  </style>  