const quoteBox = document.querySelector('.quote-box')
const quoteText = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
const googleBtn = document.querySelector('.google-button')
const nextQuoteBtn = document.querySelector('.next-quote')
const loader = document.querySelector('.loader')
const url = "https://type.fit/api/quotes"

// LOADER
const showLoader = () => {
    quoteBox.hidden = true
    loader.hidden = false
}

const hideLoader = () => {
    if(!loader.hidden) {
       quoteBox.hidden = false
    loader.hidden = true 
    } 
}

showLoader()

// API
const printText = (whereToAdd, text) => {
    whereToAdd.textContent = text
}

const getQuote = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const randomNumber = Math.floor(Math.random() * data.length)
            const quote = data[randomNumber].text
            const author = data[randomNumber].author
            printText(quoteText, quote)

            if (author.includes(",")) {
                const authorArray = author.split(",")
                printText(quoteAuthor, authorArray[0])
            } else if (author === "type.fit") {
                printText(quoteAuthor, "Autor neznámý")
            } else {
                printText(quoteAuthor, author)
            }

            hideLoader()
        })
}

getQuote()

// GOOGLE
const googleSearch = () => {
    const quote = quoteText.textContent
    const author = quoteAuthor.textContent
    const url = `https://www.google.com/search?q=${quote}+${author}`
    window.open(url)
}

googleBtn.addEventListener("click", googleSearch)

//NEXT QUOTE
nextQuoteBtn.addEventListener("click", getQuote)