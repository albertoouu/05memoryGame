fetch("../data/memory.json")
.then((response) => response.json())
.then((data) => renderCards(data))
.then((error) => console.log(error))

let renderCards = (data) => {

  let cardsSection = document.getElementById('cardsSection');
 // data.cards.sort(() => Math.random() - 0.5)
  for (const carta of data.cards) {

    cardsSection.innerHTML +=
        `<div class="memory-card" data-framework="${carta.dataframework}">
          <img src="${carta.src}" alt="${carta.dataframework}" class="front-face" />
          <img src="../data/assets/cover2.png" alt="cover" class="back-face" />
        </div>`
  };
  const cards = document.querySelectorAll('.memory-card');
  //console.log(cards)
  let nameP1 = document.getElementById('nameP1');
  let nameP2 = document.getElementById('nameP2');
  let scoreP1 = document.getElementById('scoreP1');
  let scoreP2 = document.getElementById('scoreP2');


  let botonPlay = document.getElementById('botonPlay')
  botonPlay.addEventListener('click', () => {
  document.getElementById('welcome').hidden = true
  document.getElementById('mainSection').hidden = false
  nameP1.innerHTML = "P1 "+document.getElementById('inputP1').value + ":"
  nameP2.innerHTML = "P2 "+document.getElementById('inputP2').value + ":"
  })

  let botonRegresar = document.getElementById('regresar')
  botonRegresar.addEventListener('click', () => {
    console.log("click regresar")
    location.reload();
    document.getElementById('welcome').hidden = false
    document.getElementById('mainSection').hidden = true
  })
  nameP1.style.color = '#e36477'
  scoreP1.innerHTML="0"
  scoreP2.innerHTML="0"
  //console.log(cards)

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let turno = 0;
  let score1 =0;
  let score2= 0;

  function flipCard() {
    if (lockBoard) return;
    if (this == firstCard) return;

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
    if(isMatch){
      disableCards()
      if((turno%2)==1){
        score1++;
        console.log("El score de p1 es: "+score1)
        scoreP1.innerHTML=score1
        ganador(score1,score2)
      }else{
        score2++;
        console.log("El score de p2 es: "+score2)
        scoreP2.innerHTML=score2
        ganador(score1,score2)
      }
    }else{
      unflipCards()
    }
    //isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard()

    }, 1000);
  }
  
  function resetBoard(){
    hasFlippedCard = false 
    lockBoard = false
    firstCard = null
    secondCard = null
  }
  function ganador(score1,score2){
    setTimeout(() => {
    if((score1+score2)==10){
      if(score1>score2){
        alert(`¡Felicidades, ganaste ${document.getElementById('inputP1').value}!`)
      } else {
        if(score1<score2){
          alert(`¡Felicidades, ganaste ${document.getElementById('inputP2').value}!`)
        } else {
          alert("¡Es un empate!")
        }
      }
    }
  },500)
  }

  cards.forEach(card => card.addEventListener('click', flipCard));

}
document.getElementById('welcome').hidden = false
document.getElementById('mainSection').hidden = true