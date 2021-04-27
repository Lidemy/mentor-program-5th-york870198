function Palindrome(s) {
  const str = s.split('')
  let r = 'True'
  let a = ''
  let b = ''
  while (str.length > 1) {
    a = str.shift()
    b = str.pop()
    if (a !== b) {
      r = 'False'
      break
    }
  }
  console.log(r)
}

Palindrome('abbbba')
