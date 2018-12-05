/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
//const cards = document.querySelector(".card");
const restart = document.querySelector(".restart");
const cards = document.getElementsByClassName("card");
const showtime = document.querySelector("#showtime");
const moves = document.querySelector(".moves");
let movesStep = 0;
let clickCards = [];
let accountCards = [];
for (let i = 0; i < cards.length; i++) {   // create card array
    accountCards[i] = cards[i];
}
var second = 0;
var minute = 0;
var hour = 0;
var timeState =0;
var interval;
function settimer(){
    interval = setInterval(function(){
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        showtime.innerHTML = `${hour}:${minute}:${second}`; //display time
    },1000);
}


//window.onload = startGame();
//shuffle the list of cards using the provided "shuffle" method
restart.addEventListener('click', function(){
    accountCards = shuffle(accountCards);                          //shuffle the list of cards
    deck.innerHTML = ""; 
    movesStep = 0;
    moves.textContent ="";                                        //clear deck
    hour = 0;
    minute = 0;
    second = 0;                                          
    showtime.innerHTML =`${hour}:${minute}:${second}`;                                   
    for (var x = 0; x < accountCards.length; x++) {                //loop add card
        accountCards[x].classList.remove('open', 'show', 'match'); //remove each card
        deck.appendChild(accountCards[x]);                         // add card
    }
});

//set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(e){
    if (timeState == 0) {
        settimer();                       //run time function
        timeState = 1;                   //timer 
    }
    if ((e.target.tagName) == 'LI' && clickCards.length < 2 && !e.target.classList.contains('show', 'open')){ //judge condition
    screenCard(e.target);                              // run function screenCard
    setstar();
    }
});

// play and match card
function screenCard(element){
    clickCards.push(element);                          //Add a new item to an array
    element.classList.add('show', 'open');                //used to show the dropdown content
    if (clickCards.length === 2){
        const firstItem = clickCards[0].querySelector("i").classList.value; //identify element value
        const secondItem = clickCards[1].querySelector("i").classList.value;
        if (firstItem != secondItem){
            setTimeout(function () {
            clickCards[0].classList.remove('show', 'open'); //remove classList
            clickCards[1].classList.remove('show', 'open'); 
            clickCards.splice(0, clickCards.length)         //delete array
            },1000);                                        //set run stop time
            }
        else{
            clickCards[0].classList.add('match');           //display element
            clickCards[1].classList.add('match'); 
            clickCards.splice(0, clickCards.length);         //delete array
            movesStep++;
            //moves.textContent = movesStep;
            match();
            }
    }
}

// set star
function setstar(){
    const showtimer = document.querySelector(".showtime");
    const moves = document.querySelector(".moves");
    let  star = document.getElementsByClassName("fa fa-star"); 
    if (parseInt(minute) >= 3 && parseInt(minute) <= 6){ //judge minute condition
        star[0].remove();
    }
    if (parseInt(minute) >= 7 && parseInt(minute) <= 15){
        star[0].remove();
    }
    else if (parseInt(minute) >= 15){
    swal("Oop","You are fail!");
    }
}

//Check player if success
function match(){
    const matchs = document.getElementsByClassName("card match");
    if (matchs.length === accountCards.length){
        swal("Yay","You are Success")
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
