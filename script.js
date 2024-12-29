
let cards = [];
let currentIndex = 0;

const frontText = document.getElementById('frontText');
const backText = document.getElementById('backText');
const showBtn = document.getElementById('showBtn');
const continueBtn = document.getElementById('continueBtn');

// On page load, fetch the cards and start the process
window.addEventListener('DOMContentLoaded', () => {
  fetch('spring.json')
    .then(response => response.json())
    .then(data => {
      // Shuffle the data
      cards = shuffle(data);
      // Set up the first card
      currentIndex = 0;
      showCard(currentIndex);
      // Initially, only the "Show" button should be visible
      showBtn.style.display = 'inline-block';
      continueBtn.style.display = 'none';
    })
    .catch(error => {
      console.error("Error loading cards.json:", error);
      frontText.textContent =
        "Failed to load cards. Check console for details.";
    });
});

// Event listener for "Show" button
showBtn.addEventListener('click', () => {
  // Reveal the back text
  backText.style.display = "block";
  // Hide the Show button, show the Continue button
  showBtn.style.display = 'none';
  continueBtn.style.display = 'inline-block';
});

// Event listener for "Continue" button
continueBtn.addEventListener('click', () => {
  currentIndex++;
  showCard(currentIndex);
  // After showing next front side, hide the Continue button, show the Show button
  showBtn.style.display = 'inline-block';
  continueBtn.style.display = 'none';
});

/**
 * Displays the card at the given index (front side only).
 */
function showCard(index) {
  if (!cards || cards.length === 0) {
    frontText.textContent = "No flashcards found.";
    backText.style.display = "none";
    return;
  }
  if (index >= cards.length) {
    frontText.textContent = "No more cards!";
    backText.style.display = "none";
    backText.textContent = "";
    showBtn.disabled = true;
    continueBtn.disabled = true;
    // Hide both buttons if done
    showBtn.style.display = 'none';
    continueBtn.style.display = 'none';
    return;
  }

  // Hide the back side for the new card
  backText.style.display = "none";

  // Show the front text
  frontText.textContent = cards[index].front;
  // Prepare the back text
  backText.textContent = cards[index].back;
}

/**
 * Fisher-Yates shuffle algorithm to randomize the order of the flashcards
 */
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}
