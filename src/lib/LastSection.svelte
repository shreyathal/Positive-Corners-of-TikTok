<script>
    const tiktokLinks = {
      advice: "https://www.tiktok.com/tag/girladvice",
      fundraising: "https://www.tiktok.com/tag/mutualaid",
      deinfluencing: "https://www.tiktok.com/tag/deinfluencing",
      hopecore: "https://www.tiktok.com/tag/hopecore"
    };
  </script>
  
  <div class="conclusion-section" style="margin-top: 100px;">
    <h2>Directions to the Happy Corners</h2>
  
    <div class="link-grid">
      <a class="happy-link" href={tiktokLinks.advice} target="_blank">👵 Advice From Women</a>
      <a class="happy-link" href={tiktokLinks.fundraising} target="_blank">🤝 Fundraising</a>
      <a class="happy-link" href={tiktokLinks.deinfluencing} target="_blank">🚫 De-influencing</a>
      <a class="happy-link" href={tiktokLinks.hopecore} target="_blank">🫶 Hopecore</a>
    </div>
  
    <footer class="footnote">
      <p>
        A story created by <strong>Shreya Thalvayapati</strong> and <strong>Vrnda Aiyaswamy</strong> at 
        <a href="https://www.northeastern.edu/" target="_blank">Northeastern.</a> <br><br>
        Advised by <a href="https://camd.northeastern.edu/people/rahul-bhargava/" target="_blank">Rahul Bhargava.</a> <br><br>
        <a href="https://github.com/shreyathal/Positive-Corners-of-TikTok" target="_blank">Source code on GitHub.</a>
      </p>
    </footer>
  </div>
  
  <style>
    .conclusion-section {
      padding: 4rem 1rem;
      text-align: center;
    }
  
    .link-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Always 2 columns */
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto 3rem;
    }
  
    .happy-link {
      display: block;
      padding: 1rem;
      background-color: #000000;
      border-radius: 6px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      color: white;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
  
    .happy-link:hover {
      background-color: #61636a;
    }
  
    .footnote {
      font-size: 0.9rem;
      color: #61636a;
      margin-top: 200px;
    }
  
    .footnote a {
      color: #61636a;
      text-decoration: underline;
    }

    .footnote a:hover {
      color: white;
    }

  </style>  