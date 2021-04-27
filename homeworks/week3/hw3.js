function Prime(lines) {
  const nums = lines.map((x) => Number(x))
  const n = nums.shift()
  let r = ''
  for (let i = 0; i < n; i++) {
    r = 'Prime'
    if (nums[i] === 1) {
      r = 'Composite'
    } else if (nums[i] === 2) {
      r = 'Prime'
    } else {
      for (let d = 2; (d ** 2) <= nums[i]; d++) {
        if (nums[i] % d === 0) {
          r = 'Composite'
        }
      }
    }
    console.log(r)
  }
}

Prime(['5', '1', '2', '3', '4', '5'])
