var form = document.getElementById("details-form");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var submit = document.getElementById("submitInput");

function hideForm() {
  form.style.display = "none";
}

//Update UI

function getArticleByTitleUI() {
  form.style.display = "block";
  input2.style.display = "none";
  submit.setAttribute("onclick", "getArticleByTitle()");
}

function createArticleUI() {
  var form = document.getElementById("details-form");
  form.style.display = "block";
  submit.setAttribute("onclick", "createArticle()");
}

function updateArticleUI() {
  var form = document.getElementById("details-form");
  form.style.display = "block";
  submit.setAttribute("onclick", "updateArticle()");
}

function deleteArticleUI() {
  var form = document.getElementById("details-form");
  form.style.display = "block";
  input2.style.display = "none";
  submit.setAttribute("onclick", "deleteArticle()");
}

//Send Request

function getArticleByTitle() {
  $("#details-form").on("submit", function(e) {
    e.preventDefault();
    var self = $(this);
    var title = document.getElementById("inputTitle").value;
    $("#details-form").attr("action", "/articles/" + title)
    $("#details-form").attr("method", "GET")
    $("#details-form").off("submit");
    self.submit();
  });
}

function createArticle() {
  $("#details-form").on("submit", function(e) {
    e.preventDefault();
    var self = $(this);
    var title = document.getElementById("inputTitle").value;
    var content = document.getElementById("textArea").value;
    $("#details-form").attr("action", "/articles/?title=" + title + "&content=" + content)
    $("#details-form").attr("method", "POST")
    $("#details-form").off("submit");
    self.submit();
  });
}

function updateArticle() {
  $("#details-form").on("submit", function(e) {
    e.preventDefault();
    var self = $(this);
    var title = document.getElementById("inputTitle").value;
    var content = document.getElementById("textArea").value;
    $("#details-form").attr("action", "/articles/update/" + title + "/?content=" + content)
    $("#details-form").attr("method", "POST")
    $("#details-form").off("submit");
    self.submit();
  });
}

function deleteArticle() {
  $("#details-form").on("submit", function(e) {
    e.preventDefault();
    var self = $(this);
    var title = document.getElementById("inputTitle").value;
    $("#details-form").attr("action", "/articles/delete/" + title)
    $("#details-form").attr("method", "POST")
    $("#details-form").off("submit");
    self.submit();
  });
}
