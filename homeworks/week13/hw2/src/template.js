export function getTemplate(siteKey) {
  const formTemplate = `
  <div class="row justify-content-center">
    <div class="form col-12 col-lg-8 bg-primary p-3 text-center">
      <form method="POST" action="./addCommentsAPI.php">
        <div>
          <input type="text" name="name" placeholder="暱稱" class="form-control">
          <input type="hidden" name="siteKey" value="${siteKey}">
        </div>
        <div class="mt-3">
          <textarea placeholder="留言" class="form-control" name="content"></textarea>
        </div>
        <button type="submit" class="btn btn-light btn-sm mt-3">送出</button>
      </form>
    </div>
  </div>
  <div class="row justify-content-center main--${siteKey}">
    
  </div>
  <div class="row justify-content-center footer">
    <div class="block--comment--footer col-12 col-lg-8 bg-info p-3">
      <button class="btn btn-success more--${siteKey}">載入更多</button>
    </div>
  </div>`
  return formTemplate
}