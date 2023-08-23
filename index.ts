console.log("hello")

class Note {
    id: number
    note: string
    constructor (note: string, id: number = Date.now() * Math.random()) {
        this.note = note
        this.id = id
    }
}

class NoteManager {
    notes: Note[] = [];
    constructor () {
        let notesLocal = JSON.parse((localStorage.getItem("notes")) ?? "[]");

        let notesTemp = []

        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id))
        }

        this.notes = notesTemp 
        this.render();
    }

    createNote(newNote: Note ) {
        this.notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }

    deleteNote(id: number) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }
 
    render(): void {
        let renderEl = document.getElementById("list-notes") as HTMLElement;
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
            `
        })
        renderEl.innerHTML = noteString;
    }
}


const notes = new NoteManager();

function addNewNote() {
    if ((document.getElementById("note") as HTMLInputElement).value != "") {
        let noteValue = (document.getElementById("note") as HTMLInputElement).value
        let newNote = new Note(noteValue);
        notes.createNote(newNote);
        // Hiển thị thông báo toast
        const toastElement = document.getElementById("toast") as HTMLElement;
        toastElement.innerText = "Note added successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
        (document.getElementById("note") as HTMLInputElement).value = ""
    } else {
        alert("Please enter your note!")
    }
}

function handleDeleteNote(id: number) {
    if (confirm("Do you want to delete note")) {
        notes.deleteNote(id);
        // Hiển thị thông báo toast
        const toastElement = document.getElementById("toast") as HTMLElement;
        toastElement.innerText = "Delete note successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
    }
}