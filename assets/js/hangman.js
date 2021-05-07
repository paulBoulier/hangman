const myWords = ["pomme", "poire", "abricot", "anticonstitutionnellement", "dessert", "cotillon", "fragment", "globale", "obstruer", "charpentier", "pointe", "esprit", "joue", "remorqueur", "parfumerie", "poche", "carrefour", "gonfler", "camping"].map(word => word.toUpperCase())

const imgPathList = ["./assets/img/img-1.png", "./assets/img/img-2.png", "./assets/img/img-3.png", "./assets/img/img-4.png", "./assets/img/img-5.png", "./assets/img/img-6.png", "./assets/img/img-7.png"]

let guessCount = 7 - 1
let life = 0
let randomWordLength = 0
let currentWordGuessed = 0

function initLife() {
    life = guessCount
}

function loseALife() {
    life--
    if (life == 0) onDie()
    setImage()
}

// création du mot et injection dans le DOM
function createWordToGuess() {
    const wordSpliterArray = wordSpliter()
    console.log(wordSpliterArray)
    // ajouter les lettres du mot à trouver
    wordSpliterArray.forEach(toGuessLetter => {
        // création de la lettre dans l'html
        const guessCase = document.createElement("div")
        guessCase.style.cssText = "flex:1px;margin:2px;display:flex;justify-content:center;align-items:center"
        // on injecte le span dans une div avec la lettre à deviner, elle est cachée par défaut avec la classe guessCase-letter
        // on injecte la data de la même valeur que la lettre
        guessCase.innerHTML = `<span class=\"guessCase-letter\" data-letter=\"${toGuessLetter}\">${toGuessLetter}</span>`
        // on stylise le mot à deviner
        guessCase.style.borderBottom = "1px solid black"
        guessZone.append(guessCase)

    })
}

function createAbcBtns() {
    // creation des boutons, ajout au DOM et gestion et réaction au click
    "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("").forEach(alphaLetter => {
        const btn = document.createElement("input")
        btn.type = "button"
        btn.value = alphaLetter
        btn.onclick = function () {
            // au clique on désactive toujours le bouton
            this.disabled = true
            // sélection de tous les lettres du mots dans le DOM, il retourne le nombre de span trouvés
            // on ajoute la classe "active" à chaque span trouvé
            const checkArray = Array.from(document.querySelectorAll("span[data-letter]")).filter(dataLetter => {
                const isEqual = alphaLetter == dataLetter.dataset.letter
                if (isEqual) {
                    dataLetter.classList.add("letter-active")
                    letterFound()
                }
                return isEqual
            })
            // si checkArray est vide c'est que l'on a trouvé aucune occurence, on perd une vie
            if (checkArray.length == 0) {
                loseALife()
            }
        }
        // on ajoute le bouton à la div #buttonAlphaZone
        buttonAlphaZone.append(btn)
    })
}

// change l'image par rapport à l'inverse de life
// ex: life = 7
// si life == 7 : image index = (7 - life) = 0
// si life == 3 : image index = (7 - life) = 4
function setImage() {
    if (life > -1) img.src = imgPathList[guessCount - (life)]
}

// cache le bouton recommencer
function hideRstBtn() {
    restartBtn.classList.remove("restart-show")
}

// affiche le bouton recommencer
function showRstBtn() {
    restartBtn.classList.add("restart-show")
}

// genère un entier aléatoire pour sélectionner un mot dans la liste myWords
function getRandomInt() {
    return Math.round(Math.random() * myWords.length - 1);
}

// découpe le mot par lettre et le retourne
function wordSpliter() {
    const randomWord = myWords[getRandomInt()]
    randomWordLength = randomWord.length
    return randomWord.split("")
}

// supprime toutes les lettres générées
function removeGuessWordZone() {
    // sélection toutes les lettres générées par createWordToGuess()
    // on transforme en Array pour faire un forEach
    Array.from(guessZone.children).forEach(child => guessZone.removeChild(child))
}

// lors de la victoire affiche un message et montre le bouton recommencer
function onWin() {
    alert("gagné !")
    showRstBtn()
    currentWordGuessed = 0
}

// quand c'est perdu alerter perdu
function onDie() {
    alert("perdu")
    disableButtons()
    showRstBtn()
}

// on active toutes les lettres de saisies
function toActiveButtons() {
    document.querySelectorAll("#buttonAlphaZone>input").forEach(alphaButton => alphaButton.disabled = false)
}

// on désactve toutes les lettres de saisies
function disableButtons() {
    document.querySelectorAll("#buttonAlphaZone>input").forEach(alphaButton => alphaButton.disabled = true)
}

function letterFound() {
    currentWordGuessed++
    console.log(currentWordGuessed, randomWordLength)
    if (currentWordGuessed == randomWordLength) onWin()
}

initLife()
createWordToGuess()
createAbcBtns()
setImage()

// quand on clique sur le bouton recommencer
document.querySelector("button[data-restart]").addEventListener("click", function () {
    initLife()
    toActiveButtons()
    removeGuessWordZone()
    setImage()
    createWordToGuess()
    hideRstBtn()
})



// button.click => toGuess.indexof(this.dataset.value)