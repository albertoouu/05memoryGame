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
  let nameP1 = document.getElementById('nameP1')
  let nameP2 = document.getElementById('nameP2')
  let scoreP1 = document.getElementById('scoreP1')
  let scoreP2 = document.getElementById('scoreP2')
  nameP1.style.color = '#e36477'
  scoreP1.innerHTML="0"
  scoreP2.innerHTML="0"
  console.log(cards)

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let turno = 0;
  let score1 =0;
  let score2= 0;

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
    turno++;
    if((turno%2)==1){
     nameP1.style.color = '#fff'
     nameP2.style.color = '#e36477'
    }else{
      nameP2.style.color = '#fff'
      nameP1.style.color = '#e36477'
    }
    console.log(turno)
    if(isMatch){
      disableCards()
      if((turno%2)==1){
        score1++;
        console.log("El score de p1 es: "+score1)
        scoreP1.innerHTML=score1
      }else{
        score2++;
        console.log("El score de p2 es: "+score2)
        scoreP2.innerHTML=score2
      }
    }else{
      unflipCards()
    }
    //isMatch ? disableCards() : unflipCards();
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


