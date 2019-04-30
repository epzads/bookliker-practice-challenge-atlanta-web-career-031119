document.addEventListener("DOMContentLoaded", function() {
   
fetchAllBooks()
}

);


function fetchAllBooks(){
  fetch('http://localhost:3000/books')  
  .then(response => response.json())
  .then(data => data.forEach(data => addbooks(data)))  

}

function addbooks(data){
    let listPanel = document.getElementById('list-panel')
    let newLi = document.createElement('li')
    newLi.innerText = data.title
    newLi.dataset.id = data.id
    newLi.addEventListener('click',showBook)
    listPanel.appendChild(newLi)


}

function showBook(e){

    let bookId = e.target.dataset.id

    fetch(`http://localhost:3000/books/${bookId}`)
    .then (response=> response.json())
    .then (bookData => renderShow(bookData))

}
function sB(data){
   // console.log(data.id)
    let bookId = data.id

    fetch(`http://localhost:3000/books/${bookId}`)
    .then (response=> response.json())
    .then (bookData => renderShow(bookData))

}




function renderShow(bookData){

   // console.log(bookData)
    let div = document.getElementById('show-panel')
    div.innerHTML = ""
    let nH = document.createElement('h2')
    nH.innerText = bookData.title
    let img = document.createElement('img')
    img.src = bookData.img_url
    let p = document.createElement('p')
    p.innerText = `Description :-${bookData.description}`
    let newUserUl = document.createElement ('ul')
    newUserUl.innerText = "LIKED BY USERS"
    let likeBtn = document.createElement('button')
    likeBtn.dataset.id = bookData.id
    likeBtn.innerText = "like"
    //likeBtn.addEventListener('click',(e)=>handleClick(bookData))
    likeBtn.addEventListener('click',handleClick)
    
    for (username of bookData.users){
    
        let newUserLi = document.createElement('li')
        newUserLi.innerText = username.username
        newUserUl.appendChild(newUserLi)
    }
    div.appendChild(nH)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(likeBtn)
    div.appendChild(newUserUl)
}

function handleClick(e){
   
   console.log(e.target.dataset.id)
   fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
    .then (response=> response.json())
    .then (bookData => chkUser(bookData,e))
}
function chkUser(bookData,e) {
    let users = bookData.users
    let userArray = []
    for (user of users){
        var obj = {}
        obj["id"] = user.id 
        obj["username"] = user.username
        userArray.push(obj)
       
    }
    let checkArray = []
    
    for (u of userArray){
    checkArray.push(u.id)
       }
             if (checkArray.includes(1)){
            alert("You have already like this book")
    
         } 
            else {
            console.log(e.target.parentElement)
              let u =  e.target.parentElement.querySelector('ul')
              let newUserLi = document.createElement('li')
             newUserLi.innerText = "pourus"
              u.appendChild(newUserLi)
                let no = {}
                no["id"] = 1 
                no["username"] = "pouros"
                userArray.push(no)
                let body = {}
                body["users"] = userArray 

        
         fetch(`http://localhost:3000/books/${bookData.id}`,{ 
            method: 'PATCH',
           body: JSON.stringify(body),
          headers:{
             "Content-Type": "application/json",  

        }
    })

  
   }

}

