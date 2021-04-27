function Narci(str) {
  const nums = str.split(' ')
  let result = ''
  for (let i = parseInt(nums[0]); i <= parseInt(nums[1]); i++) {
    let r = 0
    const t = i.toString().split('')
    for (let j = 0; j < t.length; j++) {
      r += (parseInt(t[j]) ** t.length)
    }
    if (r === i) {
      result += i
      result += '\n'
    }
  }
  console.log(result)
}

Narci('5 200')
