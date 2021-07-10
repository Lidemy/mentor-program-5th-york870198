let listCount = 1
const urlParams = new URLSearchParams(window.location.search)
const pageId = urlParams.get('id')

if (pageId) {
  loading(pageId)
}

$(document).ready(() => {
  $('#new-todo').click(() => {
    const content = ($('#new-content').val()) ? $('#new-content').val() : 'Taking a break? sweet.'
    newTodo(listCount, content)
  })
  $(document).delegate('.delete-btn', 'mouseenter', buttonEmphasizeOn)
  $(document).delegate('.delete-btn', 'mouseleave', buttonEmphasizeOff)
  $(document).delegate('.delete-btn', 'click', deleteTodo)
  $(document).delegate('input[type=checkbox]', 'click', checking)
  $(document).delegate('label[id]', 'click', editing)
  $(document).delegate('label+input', 'keydown', editConfirm)
  $('.find-btn').click(findTodos)
  $('#clear').click(clearCompleted)
  $('#save').click(saving)
})

function newTodo(id, content, checked = false) {
  let todoStr = '<div id="todo-{id}" class="border border-success text-success mt-1 mb-1 d-flex justify-content-between input-group flex-nowrap rounded todo"><div class="d-flex"><div class="input-group-text"><input type="checkbox" name="isDone" class="form-check-input" id="checkbox-{id}"></div><div class="content p-2"><label id="content-{id}">{content}</label></div></div><div class=" p-1"><div id="delete-{id}" class="border border-primary p-1 rounded delete-btn">刪除</div></div></div>'
  todoStr = todoStr.replace(/{id}/g, id)
  todoStr = todoStr.replace(/{content}/, escape(content))
  const html = $.parseHTML(todoStr)
  $('#new-content').val('')
  $('.main').append(html)
  $(`#checkbox-${id}`)[0].checked = checked
  $(`#content-${id}`)[0].innerText = unescape($(`#content-${id}`)[0].innerText)
  listCount = parseInt(id) + 1
}

function deleteTodo() {
  const id = this.id.replace('delete-', '')
  $(`#todo-${id}`).remove()
}

function buttonEmphasizeOn() {
  this.classList.add('text-danger')
  this.classList.add('fw-bolder')
}

function buttonEmphasizeOff() {
  this.classList.remove('text-danger')
  this.classList.remove('fw-bolder')
}

function findTodos() {
  if (this.classList.contains('todo-all')) {
    $('.todo').each(function() {
      $(this).show(400)
      $(this).addClass('d-flex')
    })
  } else if (this.classList.contains('todo-active')) {
    $('.todo').each(function() {
      if (!($(this).find('input')[0].checked)) {
        $(this).show(400)
        $(this).addClass('d-flex')
      } else {
        $(this).hide(400)
        $(this).removeClass('d-flex')
      }
    })
  } else if (this.classList.contains('todo-completed')) {
    $('.todo').each(function() {
      if (($(this).find('input')[0].checked)) {
        $(this).show(400)
        $(this).addClass('d-flex')
      } else {
        $(this).hide(400)
        $(this).removeClass('d-flex')
      }
    })
  }
}

function checking() {
  const id = $(this)[0].id.replace('checkbox-', '')
  if ($(this)[0].checked) {
    $(`#content-${id}`).addClass('text-decoration-line-through')
    $(`#content-${id}`).addClass('text-muted')
  } else {
    $(`#content-${id}`).removeClass('text-decoration-line-through')
    $(`#content-${id}`).removeClass('text-muted')
  }
}

function clearCompleted() {
  $('.todo').each(function() {
    if (($(this).find('input')[0].checked)) {
      $(`#${this.id}`).remove()
    }
  })
}

function saving() {
  const arr = []
  $('.todo').each(function() {
    const id = this.id.replace('todo-', '')
    const { checked } = $(this).find('input')[0]
    const content = $(this).find('label')[0].innerText
    arr.push({
      id,
      checked,
      content
    })
  })
  const result = JSON.stringify(arr)
  $.ajax({
    type: 'POST',
    url: 'todoAPI.php',
    data: { data: result },
    success: (e) => {
      $('#banner').replaceWith(`<h3 id="banner">Todo List ${e}</h3>`)
      const stateObj = { realUrl: 'index.html' }
      history.pushState(stateObj, `todo ${e}`, `index.html?id=${e}`)
    }
  })
}

function loading(id) {
  $.ajax({
    type: 'GET',
    url: `todoAPI.php?id=${id}`,
    success: (data) => {
      $('#banner').replaceWith(`<h3 id="banner">Todo List ${id}</h3>`)
      const todos = JSON.parse(data)
      todos.forEach((todo) => {
        newTodo(todo.id, todo.content, todo.checked)
      })
    }
  })
}

function editing() {
  const id = $(this)[0].id.replace('content-', '')
  const inputStr = `<input type=text class="form-control" id="input-${id}">`
  const html = $.parseHTML(inputStr)
  $(this).after(html)
  $(`#input-${id}`).val($(this)[0].innerText)
  $(`#input-${id}`)[0].focus()
  $(this).hide(0)
}

function editConfirm(ev) {
  if (ev.keyCode === 13) {
    const id = $(this)[0].id.replace('input-', '')
    $(`#content-${id}`)[0].innerText = unescape($(this).val())
    $(`#content-${id}`).show(0)
    $(this).remove()
  }
}
