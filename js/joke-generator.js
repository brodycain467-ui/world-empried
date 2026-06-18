// Joke Generator State
let currentJoke = null;
let jokeCount = 0;
const API_URL = 'https://v2.jokeapi.dev/joke/Any';

// Fetch a random joke from the API
async function fetchJoke() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const jokeDisplay = document.getElementById('jokeDisplay');
  const jokeText = document.getElementById('jokeText');
  
  // Show loading state
  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  jokeDisplay.style.opacity = '0.5';
  
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the joke based on type
    if (data.type === 'single') {
      currentJoke = data.joke;
    } else if (data.type === 'twopart') {
      currentJoke = `${data.setup}\n\n${data.delivery}`;
    } else {
      currentJoke = 'Could not load joke format';
    }
    
    // Display the joke
    jokeText.innerHTML = currentJoke.replace(/\n/g, '<br>');
    jokeCount++;
    updateJokeCount();
    
    // Hide loading and error states
    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    jokeDisplay.style.opacity = '1';
    
    // Show next button
    document.getElementById('getJokeBtn').style.display = 'none';
    document.getElementById('nextJokeBtn').style.display = 'block';
    
  } catch (error) {
    console.error('Error fetching joke:', error);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('errorText').innerText = 
      `Error: ${error.message}. Please check your internet connection and try again.`;
    jokeDisplay.style.opacity = '1';
  }
}

// Copy joke to clipboard
function copyJoke() {
  if (!currentJoke) {
    alert('No joke to copy! Get a joke first.');
    return;
  }
  
  navigator.clipboard.writeText(currentJoke).then(() => {
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = '✅ Copied!';
    
    setTimeout(() => {
      btn.innerText = originalText;
    }, 2000);
  }).catch(err => {
    alert('Failed to copy joke: ' + err);
  });
}

// Share joke (using Web Share API if available)
function shareJoke() {
  if (!currentJoke) {
    alert('No joke to share! Get a joke first.');
    return;
  }
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'Check out this joke!',
      text: currentJoke,
      url: window.location.href
    }).catch(err => {
      console.log('Share cancelled or error:', err);
    });
  } else {
    // Fallback: Open mailto with joke text
    const subject = 'Check out this joke!';
    const body = encodeURIComponent(currentJoke);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
}

// Update joke count display
function updateJokeCount() {
  document.getElementById('jokeCount').innerText = `Jokes loaded: ${jokeCount}`;
}

// Load initial joke on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchJoke();
});
