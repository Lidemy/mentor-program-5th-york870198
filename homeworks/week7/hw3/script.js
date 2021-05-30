
const input = document.querySelector('input')
const list = document.querySelector('.list_zone')
input.addEventListener('keypress', (e) => {
  if ((e.code === 'Enter' || e.code === 'Enter') && input.value !== '') {
    const newTodo = document.createElement('div')
    newTodo.classList.add('todos')
    newTodo.innerHTML = `<span><input type="checkbox">${input.value}</span><span class="delete_btn">X</span>`
    list.appendChild(newTodo)
    input.value = ''
  }
})

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete_btn')) {
    e.target.closest('div').remove()
  } else if (e.target.hasAttribute('type')) {
    if (e.target.checked) {
      e.target.closest('span').classList.add('done')
    } else {
      e.target.closest('span').classList.remove('done')
    }
  }
})
