window.onload = (function() {
  const signup = document.querySelector('.board--signup')
  const login = document.querySelector('.board--login')

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('button--signup')) {
      signup.classList.remove('hidden')
    } else if (e.target.classList.contains('board--signup')) {
      signup.classList.add('hidden')
    } else if (e.target.classList.contains('button--login')) {
      login.classList.remove('hidden')
    } else if (e.target.classList.contains('board--login')) {
      login.classList.add('hidden')
    }
  })
})
