const draggableItem = document.querySelector('.item')
const boxes = document.querySelectorAll('.box')

draggableItem.addEventListener('dragstart', dragStart)

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter)
  box.addEventListener('dragover', dragOver)
  box.addEventListener('dragleave', dragLeave)
  box.addEventListener('drop', drop)
})

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id)

  setTimeout(() => {
    document.querySelector("#idle").append(draggableItem)
  }, 0)
}

document.addEventListener('click', event => {
  const element = event.target.id
  
  switch(element) {
    case "add-worker":
      dynamicDragElements()
      break
    case "add-location":
      dynamicContainerElements()
      break
  }
})

let i = 0;

function dynamicDragElements() {
  boxIterator()

  let array = []

  i++

  const newDiv = document.createElement('input')
  newDiv.setAttribute('class', 'item')
  newDiv.setAttribute('id', `worker-${i}`)
  newDiv.setAttribute('draggable', 'true')
  newDiv.setAttribute('placeholder', 'Type a name here')
  newDiv.textContent = "Worker 2"
  document.getElementById('idle').append(newDiv)

  array.push(newDiv)

  array.forEach(div => {
    div.addEventListener('dragstart', dragStart)
  })
}

function dynamicContainerElements() {
  boxIterator()

  const newBoxContainer = document.createElement('div')
  newBoxContainer.setAttribute('class', 'box-container')
  const inputElement = document.createElement('input')
  inputElement.setAttribute('class', 'box-name')
  inputElement.setAttribute('placeholder', 'Type in the name of the location here')
  const newContainer = document.createElement('div')
  newContainer.setAttribute('class', 'box')
  newBoxContainer.append(inputElement)
  newBoxContainer.append(newContainer)
  document.body.append(newBoxContainer)

  dynamicDragElementsHelper()
}

function dynamicDragElementsHelper() {
  boxIterator()

  let array = []

  const newDiv = document.createElement('input')
  newDiv.setAttribute('class', 'item')
  newDiv.setAttribute('id', 'worker-2')
  newDiv.setAttribute('draggable', 'true')
  newDiv.setAttribute('placeholder', 'Type a name here')
  newDiv.textContent = "Worker 2"
  document.getElementById('idle').append(newDiv)

  array.push(newDiv)

  array.forEach(div => {
    div.addEventListener('dragstart', dragStart)
  })

  array.forEach(div => div.remove())
}

function dragEnter(event) {
  event.preventDefault()
  event.target.classList.add('drag-over')
}

function dragOver(event) {
  event.preventDefault()
  event.target.classList.add('drag-over')
}

function dragLeave(event) {
  event.target.classList.remove('drag-over')
}

function drop(event) {
  event.target.classList.remove('drag-over')

  const id = event.dataTransfer.getData('text/plain')
  const draggable = document.getElementById(id)

  event.target.append(draggable)

  draggable.classList.remove('hide')
}

function boxIterator() {
  const boxes = document.querySelectorAll('.box')

  boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver)
    box.addEventListener('dragleave', dragLeave)
    box.addEventListener('drop', drop)
  });
}