const addBtn = document.querySelector('.add')
const deleteBtns = document.getElementsByClassName('delete-note') //użyto innej metody ze względu na 'żywe kolekcje'. Gdybyśmy użyli metody querySelector ten pobrał by elementy tylko raz, w momencie załadowania strony. Nie widziałby dynamicznie dodanych elementów (notatek).
const deleteAllBtn = document.querySelector('.delete-all')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('#category')
const textArea = document.querySelector('#text')
const error = document.querySelector('.error')

let selectedValue
let cardID = 0
//---------------

const openPanel = () => {
	notePanel.style.display = 'flex'
}

const closePanel = () => {
	notePanel.style.display = 'none'
	error.style.visibility = 'hidden'
	// error.textContent = ''
	textArea.value = ''
	category.selectedIndex = 0
}

const addNote = () => {
	if (textArea.value !== '' && category.options[category.selectedIndex].value !== '0') {
		createNote()
		error.style.visibility = 'hidden'
	} else {
		error.style.visibility = 'visible'
	}
}

const createNote = () => {
	const newNote = document.createElement('div')
	newNote.classList.add('note')
	newNote.setAttribute('id', cardID)

	newNote.innerHTML = `
    <div class="note-header">
    <h3 class="note-title">${selectedValue}</h3>
    <button class="delete-note" onclick='deleteNote(${cardID})'>
        <i class="fas fa-times icon"></i>
    </button>
</div>
<div class="note-body">
${textArea.value}
</div>
    `

	noteArea.appendChild(newNote)
	cardID++
	textArea.value = ''
	category.selectedIndex = 0
	notePanel.style.display = 'none'
	checkColor(newNote)
}

const selectValue = () => {
	// wywołanie tej funkcji ustawione w html jako 'onchange="selectValue()"'
	selectedValue = category.options[category.selectedIndex].text
}

const checkColor = note => {
	switch (selectedValue) {
		case 'Zakupy':
			note.style.backgroundColor = 'yelow'
			break
		case 'Praca':
			note.style.backgroundColor = 'red'
			break
		case 'Nauka':
			note.style.backgroundColor = 'royalblue'
			break
		case 'Do zrobienia':
			note.style.backgroundColor = 'fuchsia'
			break
		case 'Inne':
			note.style.backgroundColor = 'lime'
			break
	}
}

const deleteNote = id => {
	noteToDelete = document.getElementById(id)
	noteArea.removeChild(noteToDelete)
}

const deleteAllNotes = () => {
	noteArea.textContent = ''
}

addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', addNote)
deleteAllBtn.addEventListener('click', deleteAllNotes)
