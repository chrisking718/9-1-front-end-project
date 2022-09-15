//url to get and shuffle deck
const URl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

// deckID will be changed after the deck is shuffled
let deckID = ""

const BASE = "https://deckofcardsapi.com/api/deck/"
// draw first cards using the deck id
const firstDraw = `/draw/?count=4`

// link to shuffle when user wants to start new game with same deck . 
const shuffle = `/shuffle/`

//add all aces to a junk pile.
const junkPile = `/pile/junk/add/?cards=AS,AD,AC,AH `

const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")

const newGame = document.querySelector("#newGame")

const p1name = document.querySelector('#p1name')
const p2name = document.querySelector('#p2name')

const nameOne = document.querySelector('#nameOne')
const nameTwo = document.querySelector('#nameTwo')

const body = document.querySelector('body')

const winnerBox = document.querySelector('.winnerBox')
let newGameCount = 0

let player1Pile = 0
let player2Pile = 0

let drawnImages = []
let drawnValues = []
// when player clicks new new game button. game starts

let tempDeck = "qr98ugy0plse"

function closeWindow(){
    close()
}

if (confirm("Welcome to My Front End Project\n Click OK to Proceed")) {
    
  } else {
    closeWindow();
  }


newGame.addEventListener(("submit"), (event)=>{
    if(newGameCount  === 0){
        alert("Click on Card to See What You Got!")
        event.preventDefault()
        newGameCount++
    }
// console.log(`${BASE}${deckID}${firstDraw}`)

setTimeout(addTotalButton,7000)




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
                        card.src = "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg"
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


p1name.addEventListener(("submit"),(event)=>{
        event.preventDefault()
        console.log("anything1")
    if(nameOne.value.length<1){
         alert("Enter a Valid Name")
         
    }else{
        
        const h2 = document.createElement('h2')
        h2.innerText = nameOne.value
            //console.log(nameOne.value)
        player1.innerHTML = ""
        player1.append(h2)
        p2name.removeAttribute("hidden")
    }
    
})

p2name.addEventListener(("submit"),(event)=>{
    event.preventDefault()
    console.log("anything")
   
    if(nameTwo.value.length<1){
        alert("Enter a Valid Name")
    }else{
    
    const h2 = document.createElement('h2')
    h2.innerText = nameTwo.value
        console.log(nameTwo.value)
    player2.innerHTML = ""
    player2.append(h2)
    newGame.removeAttribute("hidden")
    }
})    

// adds total button to bottom of screen, hides new game button
const addScore = document.createElement("input")

function addTotalButton(){
    
    addScore.setAttribute("type","submit")
    addScore.setAttribute('value',"Add Total")
    addScore.setAttribute("id","addTotal")
   newGame.setAttribute("hidden","true")
        body.append(addScore)
}
// gives the users time to enter their name, click new game, and flip all the cards. before add total button appears no spoilers lol.
//setTimeout(addTotalButton,10000)

// adds the total of all the values for the respectful player. accounts for all values.
function addTotal(){
    if(drawnValues[0]=== "KING" ||drawnValues[0]=== "JACK"||drawnValues[0]=== "QUEEN"){

        player1Pile += 10
    }else if(drawnValues[0]=== "ACE"){

        player1Pile += 11
    }else{
        player1Pile += Number(drawnValues[0])
    }




    if(drawnValues[2]=== "KING" ||drawnValues[2]=== "JACK"||drawnValues[2]=== "QUEEN"){

        player1Pile += 10
    }else if(drawnValues[2]=== "ACE"){

        player1Pile += 11
    }else{
        player1Pile += Number(drawnValues[2])
    }




    if(drawnValues[1]=== "KING" ||drawnValues[1]=== "JACK"||drawnValues[1]=== "QUEEN"){

        player2Pile += 10
    }else if(drawnValues[1]=== "ACE"){

        player2Pile += 11
    }else{
        player2Pile += Number(drawnValues[1])
    }



    if(drawnValues[3]=== "KING" ||drawnValues[3]=== "JACK"||drawnValues[3]=== "QUEEN"){

        player2Pile += 10
    }else if(drawnValues[3]=== "ACE"){

        player2Pile += 11
    }else{
        player2Pile += Number(drawnValues[3])
    }
    
console.log(`Player 1 Score: ${player1Pile}`)
console.log(`Player 2 Score: ${player2Pile}`)

const p1Score  = document.createElement('h3')
const p2Score  = document.createElement('h3')

p1Score.innerText = player1Pile
p2Score.innerText = player2Pile

player1.appendChild(p1Score)
player2.appendChild(p2Score)


}


// when you click add score, the new game button will re appear and the add score button will disappear. 
addScore.addEventListener("click",(event)=>{
    addTotal()
    newGame.removeAttribute("hidden")
    addScore.setAttribute("hidden","true")
    setTimeout(addWinnerBox,5000)
})


function addWinnerBox(){

    winnerBox.removeAttribute("hidden")
     if(player1Pile > player2Pile){
            winnerBox.innerText= `Winner: ${nameOne.value}`
        }else if(player2Pile > player1Pile){
            winnerBox.innerText= `Winner: ${nameTwo.value}`
     }else{winnerBox.innerText = `It's a Tie!`}
}

//setTimeout(addWinnerBox,10000)