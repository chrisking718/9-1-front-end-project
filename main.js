/*Proposal #1
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

/*Proposoal #2
- Highest Pair without Aces
- The initial URl for the first fetch contains "new" to get new deck ID
   - Once I have the deck ID, I have to store the ID so that the cards come from the same deck until a new game starts
   - the "new" will now be replaced by that deck ID
   - Add "new game" button and event listener to fetch the deck.
   - Add AS AD AH AC to junk pile.
   - Add sections for player one and player two cards.
   - Add deal button with event listener and NEW fetch with the deckID to get cards from new deck and deal to each player.
    - When cards are dealt, the first card is face down, but the second card is face up.
    - Set hidden for front and back images with toggle. 
   - The value of each card dealt to each player should be stored in a value for each player.
   - Declare that if the value is QUEEN KING or JACK - the number added is 10

*/

//const URl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2'

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
                 console.log(res2)

                 console.log(res2.cards.length)

        // stores value and images for each card drawn   
                for(let i = 0;i<res2.cards.length;i++){
                            drawnImages.push(res2.cards[i].image)
                            drawnValues.push(res2.cards[i].value)
                        }
                        console.log("drawn:" + drawnValues)

        //create draw player 1 button      
            const draw1 = document.createElement('form')
            const draw1butt = document.createElement('input')
        
            draw1butt.setAttribute("type","submit")
            draw1butt.setAttribute("value","Draw Player 1")
            
            draw1butt.addEventListener('click',(event)=> {
                event.preventDefault()
                // this appends the values of the stored results in player 1 when the draw button is clicked.
                let card = document.createElement("img")
                card.setAttribute('src',`${drawnImages[0]}` )
                card.setAttribute('alt',`player1card`)
                
                drawnImages.shift()
                drawnValues.shift()
            
            
                player1.append(card)
            
            })
            
        //create draw player two button
            const draw2 = document.createElement('form')
            const draw2butt = document.createElement('input')

            draw2butt.setAttribute("type","submit")
            draw2butt.setAttribute("value","Draw Player 2")
            
    draw2butt.addEventListener('click',(event)=> {
        event.preventDefault()
        // this appends the values of the stored results in player 1 when the draw button is clicked.
        
        // console.log(drawnImages[0])
        let card = document.createElement("img")
        card.setAttribute('src',`${drawnImages[0]}` )
        card.setAttribute('alt',`player2card`)
        
        drawnImages.shift()
        drawnValues.shift()
    
    
        player2.append(card)
    
        // first thought, store the value of the pile on the site and reference that , but i may not have to . once i have the code of the card, i can use the value?
    })   

            draw1.append(draw1butt)
            draw2.append(draw2butt)
            player1.appendChild(draw1)
            player2.appendChild(draw2)
            })
        
            .catch((error)=>console.log(error))

    })
    .catch((error)=>console.log(error))

    
    
})

// const d1 = document.querySelector('draw1button')
// const d2 = document.querySelector('draw2button')

// d1.addEventListener('click',(event)=> {
//     event.preventDefault()
//     // this appends the values of the stored results in player 1 when the draw button is clicked.
//     player1.append(drawnValues[0],drawnImages[0])
    
//     //this removes the first element so when i click the d2 button, the first result changes
//     drawnImages.shift()
//     drawnValues.shift()

// })

// d2.addEventListener('click',(event)=> {
//     event.preventDefault()
//     // this appends the values of the stored results in player 1 when the draw button is clicked.
//     let card = document.createElement("img")
//     card.setAttribute('src',`${drawnImages[0]}` )
//     card.setAttribute('alt',`player2card`)
    
//     drawnImages.shift()
//     drawnValues.shift()


//     player2.append(drawnValues[0])

//     // first thought, store the value of the pile on the site and reference that , but i may not have to . once i have the code of the card, i can use the value?
// })

// get new eck and Deck ID, changes deck ID on global scope
// fetch(URl)
//     .then((res)=> res.json())
//     .then((resJson)=> {console.log(resJson)
//     deckID = resJson["deck_id"]
//     //console.log(deckID)
//     })


//     .catch((error)=> console.log(error))




   
   