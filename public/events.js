import addRandomKitten from './index.js';

export default function initializeEvents() {
  function reset() {
    document.querySelector('#score').innerText = 0;
    document.querySelector('#score-up').innerText = 0;
    document.querySelector('#score-down').innerText = 0;
    document.querySelector('#comments').innerHTML = '';
  }

  function calculateScore() {
    const score = document.querySelector('#score');
    const scoreUpEl = document.querySelector('#score-up');
    const scoreDownEl = document.querySelector('#score-down');
    if (this.vote == 'upvote') scoreUpEl.innerText = Number(scoreUpEl.innerText) + 1;
    if (this.vote == 'downvote') scoreDownEl.innerText = Number(scoreDownEl.innerText) + 1;
    score.innerText = Number(scoreUpEl.innerText) - Number(scoreDownEl.innerText);
  }

  function addComment() {
    const ul = document.querySelector('#comments');
    const li = document.createElement('li');
    li.innerText = document.querySelector('#comment-text').value;
    li.classList.add('comment');
    ul.appendChild(li);
    document.querySelector('#comment-text').value = '';
  }

  document.querySelector('#request-img-btn').addEventListener('click', async () => {
    await addRandomKitten();
    reset();
  });
  document.querySelector('#upvote').addEventListener('click', calculateScore.bind({ vote: 'upvote' }));
  document.querySelector('#downvote').addEventListener('click', calculateScore.bind({ vote: 'downvote' }));
  document.querySelector('#comment-btn').addEventListener('click', addComment);
}
