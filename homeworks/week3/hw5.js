function compare(lines) {
  const n = lines[0]
  let nums = []
  let r = ''
  for (let i = 1; i <= n; i++) {
    nums = lines[i].split(' ')
    const [a, b, win] = nums
    if (a.length === b.length) {
      r = 'DRAW'
      for (let j = 0; j < a.length; j++) {
        if (a[j] !== b[j]) {
          if ((Number(a[j]) - Number(b[j])) * Number(win) > 0) {
            r = 'A'
            break
          } else if ((Number(a[j]) - Number(b[j])) * Number(win) < 0) {
            r = 'B'
            break
          }
        }
      }
      console.log(r)
    } else {
      r = ((a.length - b.length) * Number(win)) > 0 ? 'A' : 'B'
      console.log(r)
    }
  }
}

compare(['3', '1 2 1', '1 2 -1', '2 2 -1'])
