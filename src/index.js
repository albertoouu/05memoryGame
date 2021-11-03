fetch("../data/memory.json")
.then((response) => response.json())
.then((data) => renderCards(data))
.then((error) => console.log(error))

let renderCards = (data) => {

  let cardsSection = document.getElementById('cardsSection')

  for (const carta of data.cards) {

    cardsSection.innerHTML +=
        `<div class="memory-card" data-framework="${carta.dataframework}">
          <img src="${carta.src}" alt="${carta.dataframework}" class="front-face" />
          <img src="../data/assets/cover2.png" alt="cover" class="back-face" />
        </div>`
  }
  const cards = document.querySelectorAll('.memory-card');
  console.log(cards)

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      lockBoard = false;
    }, 1000);
  }

  cards.forEach(card => card.addEventListener('click', flipCard));
}


