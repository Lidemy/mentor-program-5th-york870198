<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <meta charset="utf-8">
  <title>大廳</title>
</head>
<body>
<div class="container-lg mt-3">
  <div class="row justify-content-center">
    <div class="form col-12 col-lg-8 bg-primary p-3 text-center">
      <form method="POST" action="addCommentsAPI.php">
        <div><input type="" name="name" placeholder="暱稱" class="form-control"> </div>
        <div class="mt-3">
          <textarea placeholder="留言" class="form-control" name="content"></textarea>
        </div>
        <button type="submit" class="btn btn-light btn-sm mt-3">送出</button>
      </form>
    </div>
  </div>
  <div class="row justify-content-center main">
    
  </div>
  <div class="row justify-content-center footer">
    <div class="block--comment--footer col-12 col-lg-8 bg-info p-3">
      <button class="btn btn-success" id="more">載入更多</button>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script type="text/javascript" src="script.js"></script>
  
</body>
</html>