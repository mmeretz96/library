let myLibrary = []
const table = document.querySelector("tbody")
const newBookForm = document.querySelector("form")
const newBookButton = document.querySelector(".new-book")
const submitButton = document.querySelector(".submit")

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleRead = function(){
  this.read = !this.read
}

function addBookToLibrary (book) {
  myLibrary.push(book)
  displayBooks()
}

function displayBooks () {
  table.innerHTML = ""
  myLibrary.forEach(book => {
    let newRow = table.insertRow()
    let dataAttribute = myLibrary.indexOf(book)
    newRow.insertCell().innerText = book.title
    newRow.insertCell().innerText = book.author
    newRow.insertCell().innerText = book.pages

    let readInput = document.createElement("input")
    readInput.setAttribute("type", "checkbox")
    readInput.checked = book.read
    readInput.setAttribute("data", dataAttribute)
    readInput.addEventListener("click", e => toggleRead(dataAttribute))
    newRow.insertCell().appendChild(readInput)

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "DELETE"
    deleteButton.setAttribute("data", dataAttribute)
    newRow.insertCell().appendChild(deleteButton)
    deleteButton.addEventListener("click", e => deleteBook(dataAttribute))
    });
}

function deleteBook(index){
  myLibrary.splice(index,1)
  console.log(myLibrary)
  displayBooks()
}

function toggleRead(index){
  myLibrary[index].toggleRead()
  console.log(myLibrary[index].read)
}

newBookButton.addEventListener("click", (e) => {
  if(newBookForm.style.display == "block"){
    newBookForm.style.display = "none"
  }else{
    newBookForm.style.display = "block"
  }
})

submitButton.addEventListener("click", e => {
  e.preventDefault()
  let newTitle = document.getElementById("title").value
  let newAuthor = document.getElementById("author").value
  let newPages = document.getElementById("pages").value
  let newRead = document.getElementById("read").checked
  addBookToLibrary(new Book(newTitle, newAuthor, newPages, newRead))
  newBookForm.reset()
})


displayBooks()