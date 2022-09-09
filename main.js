//const URl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2'
//url to get and shuffle deck
const URl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

// deckID will be changed after the deck is shuffled
let deckID = ""

// draw first cards using the deck id
const firstDraw = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`

// link to add card to player 1 pile
const player1Pile = `http://deckofcardsapi.com/api/deck/${deckID}/pile/player1/add/?cards=AS,2S `

// link to add card to player 2 pile
const Player2Pile = `http://deckofcardsapi.com/api/deck/${deckID}/pile/player2/add/?cards=AS,2S `

// link to shuffle when user wants to start new game with same deck . 
const shuffle = `http://deckofcardsapi.com/api/deck/${deckID}/shuffle/`

/*
   - The initial URl for the first fetch contains "new" to get new deck ID
   - Once I have the deck ID, I have to store so that the cards come from the same deck until a new game starts
   - the "new" will now be replaced by that deck ID
   - Add "new game" button and event listener to fetch the deck.
   - Add sections for player one and player two cards.
   - Add deal button with event listener and NEW fetch with the deckID to get cards from new deck and deal to each player.
    - When cards are dealt, the first card is face down, but the second card is face up.
    - Set hidden for front and back images with toggle. 
   - The value of each card dealt to each player should be stored in a value for each player.
   - Declare that if the value is QUEEN KING or JACK - the number added is 10
   - Create alert that if an ACE is drawn the player can choose the number to be 1 or 11
   - If any player total exceeds 21. create and display alert of "BUST"

   
   */

fetch(URl)
    .then((res)=> res.json())
    .then((resJson)=> {console.log(resJson)
    deckID = resJson["deck_id"]
    console.log(deckID)
    })


    .catch((error)=> console.log(error))




   
   