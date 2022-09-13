//url to get and shuffle deck
const URl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

// deckID will be changed after the deck is shuffled
let deckID = ""

const BASE = "https://deckofcardsapi.com/api/deck/"
// draw first cards using the deck id
const firstDraw = `/draw/?count=4`

// link to add card to player 1 pile
const player1Pile = `/pile/player1/add/?cards=AS,2S `

// link to add card to player 2 pile
const Player2Pile = `/pile/player2/add/?cards=AS,2S `

// link to shuffle when user wants to start new game with same deck . 
const shuffle = `/shuffle/`

//add all aces to a junk pile.
const junkPile = `/pile/junk/add/?cards=AS,AD,AC,AH `

const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")

const newGame = document.querySelector("#newGame")

let drawnImages = []
let drawnValues = []
// when player clicks new new game button. game starts

let tempDeck = "qr98ugy0plse"

newGame.addEventListener(("submit"), (event)=>{
    event.preventDefault()
// console.log(`${BASE}${deckID}${firstDraw}`)

// this fetch adds aces to junk pile
fetch(`${BASE}${tempDeck}${shuffle}`)
    
    .then((res1) => res1.json())
    .then((res1) => {
        console.log(res1)

        //this fetch draws the first 4 cards in the new game
        fetch(`${BASE}${tempDeck}${firstDraw}`)
            .then((res2) => res2.json())
            .then((res2) => {
            // stores value and images for each card drawn   
                for(let i = 0;i<res2.cards.length;i++){
                    drawnImages.push(res2.cards[i].image)
                    drawnValues.push(res2.cards[i].value)
                }

                for (let w = 0;w<drawnImages.length;w++){

                    let card = document.createElement("img")
     
                    card.setAttribute('alt',`playercard`)
     
                    card.addEventListener('click', () => {
                    // Toggles 'back' class on image
                    card.classList.toggle('back')
                    // Contains returns boolean classList contains class
                        if(card.classList.contains('back')){
                        card.src = "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp"
                        } else {
                        card.src = drawnImages[w]
                        }
                    })  
                if(w===0 || w===2){
                    player1.append(card)
                    }else{
                          player2.append(card)
                        }
                console.log("drawn:" + drawnValues)

                    }
                })
            .catch((error) => console.log(error))
        })
    .catch((error)=>console.log(error))   
    })

