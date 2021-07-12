import $ from 'jquery'

export function getComments(apiUrl, siteKey, limit, offset, callback) {
  $.ajax({
    method: 'GET',
    url: `${apiUrl}?limit=${limit}&offset=${offset}&siteKey=${siteKey}`
  })
    .done(callback)
}
