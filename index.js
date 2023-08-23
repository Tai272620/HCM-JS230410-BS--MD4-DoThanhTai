"use strict";
console.log("hello");
class Note {
    constructor(note, id = Date.now() * Math.random()) {
        this.note = note;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.notes = [];
        let notesLocal = JSON.parse((_a = (localStorage.getItem("notes"))) !== null && _a !== void 0 ? _a : "[]");
        let notesTemp = [];
        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id));
        }
        this.notes = notesTemp;
        this.render();
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
    render() {
        let renderEl = document.getElementById("list-notes");
        let noteString = ``;
        this.notes.map((note, index) => {
            noteString += `
                <div class="note">
                    <p>${note.note}</p>
                    <button class="delete-btn">
                        <span class="material-symbols-outlined" onclick="handleDeleteNote(${note.id})">
                            delete
                        </span>
                    </button>
                </div>
            `;
        });
        renderEl.innerHTML = noteString;
    }
}
const notes = new NoteManager();
function addNewNote() {
    if (document.getElementById("note").value != "") {
        let noteValue = document.getElementById("note").value;
        let newNote = new Note(noteValue);
        notes.createNote(newNote);
        // Hiển thị thông báo toast
        const toastElement = document.getElementById("toast");
        toastElement.innerText = "Note added successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
        document.getElementById("note").value = "";
    }
    else {
        alert("Please enter your note!");
    }
}
function handleDeleteNote(id) {
    if (confirm("Do you want to delete note")) {
        notes.deleteNote(id);
        // Hiển thị thông báo toast
        const toastElement = document.getElementById("toast");
        toastElement.innerText = "Delete note successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
    }
}
