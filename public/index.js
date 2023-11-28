// Your code here
import initializeEvents from './events.js';

async function initializeCatsogram() {
  addHeader('Kitten Pic');
  addCatsContainer();
  addRequestImgBtn('request-img-btn');
  localStorage.getItem('img') ? restoreImage() : await addRandomKitten();
  addScore();
  addVoteBtns();
  addCommentInput();
  addComments();
  initializeEvents();
}

function addHeader(str) {
  const h1 = document.createElement('h1');
  h1.innerText = str;
  document.body.appendChild(h1);
}

function addCatsContainer() {
  const catsContainer = document.createElement('div');
  catsContainer.setAttribute('id', 'cats-container');
  document.body.append(catsContainer);
}

function addRequestImgBtn(id) {
  const button = document.createElement('button');
  button.setAttribute('id', id);
  button.innerText = 'New Pic';
  document.querySelector('h1').insertAdjacentElement('afterend', button);
}

export default async function addRandomKitten() {
  const catsContainer = document.getElementById('cats-container');
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  catsContainer.innerHTML = `<img alt='${data[0].id}' src='${data[0].url}'></img>`;
  localStorage.setItem('img', catsContainer.innerHTML);
}

function addScore() {
  const p = document.createElement('p');
  p.setAttribute('id', 'score-container');
  if (localStorage.getItem('score')) {
    p.innerHTML = localStorage.getItem('score');
  } else {
    p.innerHTML = `
    Popularity Score: <span id='score'>0</span>
    <br>
    <span id='score-up'>0</span> <span>👍</span>
    <span id='score-down'>0</span> <span>👎</span>
  `;
  }
  document.body.appendChild(p);
}

function addVoteBtns() {
  const div = document.createElement('div');
  const upvoteBtn = document.createElement('button');
  const downVoteBtn = document.createElement('button');
  div.setAttribute('id', 'vote-buttons')
  upvoteBtn.setAttribute('id', 'upvote');
  upvoteBtn.innerText = 'Upvote';
  downVoteBtn.setAttribute('id', 'downvote');
  downVoteBtn.innerText = 'Downvote';
  div.appendChild(upvoteBtn);
  div.appendChild(downVoteBtn);
  document.body.appendChild(div);
}

function addCommentInput() {
  const div = document.createElement('div');
  div.setAttribute('id', '#comment');
  div.innerHTML = `
    <span>Comment <input type='text' id='comment-text'></span>
    <button id='comment-btn'>Submit</button>
  `;
  document.body.appendChild(div);
}

function addComments() {
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'comments');
  if (localStorage.getItem('comments')) ul.innerHTML = localStorage.getItem('comments');
  document.body.appendChild(ul);
}

function restoreImage() {
  document.querySelector('#cats-container').innerHTML = localStorage.getItem('img');
}

window.onload = initializeCatsogram;
