dynamicContainerElements()

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id)
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

document.addEventListener('click', event => {
  const element = event.target.className
  
  switch(element) {
    case "remove":
      removeContainer(event)
      break
  }
})

document.addEventListener('click', event => {
  const element = event.target.className
  
  switch(element) {
    case "color-picker":    
      colorSetter(event)
      break
  }
})

function removeContainer(event) {
  const container = event.target.closest('.box-container');
  $(container).fadeOut()
  setTimeout(() => {
    container.remove()
  }, 1000)
}

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
  document.getElementById('idle').append(newDiv)

  array.push(newDiv)

  array.forEach(div => {
    div.addEventListener('dragstart', dragStart)
  })
}

function dynamicContainerElements() {
  boxIterator()

  /* cloneNode(boolean) - This clones an HTML element, if the boolean is set to true it'll clone the child elements as well (Including the text content) else if not (the default way) it won't only the node itself will be cloned */

  const locationSection = document.querySelector('.prototype-container').cloneNode(true)

  locationSection.querySelector('.item').remove()

  const optionSection = locationSection.querySelector('.container-functionalities')

  const removeButton = document.createElement('button')
  removeButton.setAttribute('class', 'remove')
  removeButton.textContent = "Remove"

  optionSection.insertBefore(removeButton, optionSection.querySelector('.color-picker'))

  document.body.append(locationSection)

  dynamicDragElementsHelper()
}

function dynamicDragElementsHelper() {
  boxIterator()

  let array = []

  const newDiv = document.createElement('input')
  newDiv.setAttribute('class', 'item')
  newDiv.setAttribute('id', 'worker-helper')
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

function colorSetter(event) {
  const color = event.target.value

  let box = event.target.parentElement.previousSibling.parentElement.querySelector('.box')

  if (box == null) {
    box = event.target.parentElement.previousSibling.parentElement.parentElement.querySelector('.box')
  }

  console.log(box)

  box.classList.remove('box-color')
  box.style.backgroundColor = color
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