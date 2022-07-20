console.log("This is app.js");
showNote();
//If user add a note
const addNote = document.getElementById("addBtn");
const addTxt = document.getElementById("addTxt");
const addTitle = document.getElementById("addTitle");
const notes = document.getElementById("notes");
let note;

function calulateNoOfNotes() {

    let data = localStorage.getItem('notes');
    obj = JSON.parse(data);
    return obj.length;
}


function delNote(i) {
    // console.log("deleting", i);
    let data = localStorage.getItem('notes');
    obj = JSON.parse(data);
    obj.splice(i, 1);
    localStorage.setItem('notes', JSON.stringify(obj));
    let titleData = localStorage.getItem('title');
    titleObj = JSON.parse(titleData);
    titleObj.splice(i, 1);
    localStorage.setItem('title', JSON.stringify(titleObj));
    showNote();
}

function showNote() {
    //note body
    let noteArr = localStorage.getItem('notes');
    if (noteArr == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(noteArr);
    }
    //title
    let titleArr = localStorage.getItem('title');
    if (titleArr == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(titleArr);
    }
    let html = "";
    notesObj.forEach((element, i) => {
        html += `<div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titleObj[i]}</h5>
                        <p class="card-text ">${element}</p>
                        <button id="${i}" onclick="delNote(this.id)"  class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
    });
    const notes = document.getElementById("notes");
    if (notesObj.length != 0) {
        notes.innerHTML  = html;
    } else {
        notes.innerHTML = `Nothing to show! Use "Add Note" section above to add notes.`;
    }
}


addNote.addEventListener('click', () => {
    
    let noteArr = localStorage.getItem('notes');
    if (noteArr == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(noteArr);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    let titleArr = localStorage.getItem('title');
    if (titleArr == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(titleArr);
    }
    titleObj.push(addTitle.value);
    localStorage.setItem('title', JSON.stringify(titleObj));
    showNote();
    addTxt.value = "";
    addTitle.value = "";
})


let search = document.getElementById('searchTxt');
search.addEventListener('input',()=>{
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (cardText.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            
            element.style.display = 'none';
        }
    })
})
