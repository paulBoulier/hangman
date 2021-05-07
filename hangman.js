const myWords = ["pomme", "poire", "abricot", "anticonstitutionnellement", "dessert", "cotillon", "fragment", "globale", "obstruer", "charpentier", "pointe", "esprit", "joue", "remorqueur", "parfumerie", "poche", "carrefour", "gonfler", "camping"].map(word => word.toUpperCase())

let life = 1

function isDead() {
    if (life == 0) {
        restartBtn.classList.add("restart-show")
        life = 2
    }
}

function start(isFirst) {

    document.querySelector("img").src = "https://picsum.photos/400/300"
    // décrémente la vie et change l'image
    function loseALife() {
        life--
        isDead()
        document.querySelector("img").src = "https://picsum.photos/400/300"
    }

    function getRandomInt(max) {
        return Math.round(Math.random() * max);
    }

    const id = getRandomInt(myWords.length - 1)
    const toGuessArray = myWords[id].split("")
    console.log(toGuessArray)

    // ajouter les cases dans la zone
    toGuessArray.forEach(toGuessLetter => {
        const guessCase = document.createElement("div")
        guessCase.style.cssText = "flex:1px;margin:2px;display:flex;justify-content:center;align-items:center"
        guessCase.innerHTML = `<span class=\"guessCase-letter\" data-letter=\"${toGuessLetter}\">${toGuessLetter}</span>`
        guessCase.style.borderBottom = "1px solid black"
        guessZone.append(guessCase)

    })

    if (isFirst)
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

function removeCurrentGame() {
    Array.from(guessZone.children).forEach(child => guessZone.removeChild(child))
}

function resetButtons() {
    document.querySelectorAll("#buttonAlphaZone>input").forEach(alphaButton => alphaButton.disabled = false)
}

document.querySelector("button[data-restart]").addEventListener("click", function () {
    this.classList.remove("restart-show")
    removeCurrentGame()
    resetButtons()
    start(false)
})

start(true)

// button.click => toGuess.indexof(this.dataset.value)