var rootUrl = "https://jsonplaceholder.typicode.com/";

function getArticles() {
  return $.ajax({
    url: rootUrl + "posts",
    method: "GET"
  });
}

function deleteArticle(articleId) {
  return $.ajax({
    url: rootUrl + "posts/" + articleId,
    method: "DELETE"
  });
}

function patchArticle(articleId, inputTitle, inputBody) {
  return $.ajax({
    url: rootUrl + "posts/" + articleId,
    method: "PATCH",
    data: {
      title: inputTitle.value,
      body: inputBody.value
    }
  });
}
