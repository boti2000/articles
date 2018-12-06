getArticles().then(displayArticles);

function displayArticles(articles) {
  console.log(articles); 

  var template = document.getElementById("template");
  var articlesContainer = document.getElementById("articles");

  for (var i = 0; i < 10; i++) {
    displayArticle(articles[i], template, articlesContainer);
  }
}

function displayArticle(article, template, articlesContainer) {
  var articleClone = template.cloneNode(true);

  articleClone.id = "article_" + article.id;

  var articleIdElement = articleClone.querySelector(".article-id");
  articleIdElement.innerHTML = article.id;

  var articleTitleElement = articleClone.querySelector(".article-title");
  articleTitleElement.innerHTML = article.title;

  var articleBodyElement = articleClone.querySelector(".article-body");
  articleBodyElement.innerHTML = article.body;

  var articleAuthorElement = articleClone.querySelector(".article-author");
  articleAuthorElement.innerHTML = "Author:" + article.userId;

  var deleteButton = articleClone.querySelector(".article-delete");
  deleteButton.addEventListener("click", deleteArticleOnClick);

  var editButton = articleClone.querySelector(".article-edit");
  editButton.addEventListener("click", updateArticleOnClick);

  articlesContainer.appendChild(articleClone);
}

function updateArticleOnClick(event) {
  event.target.disabled = true;

  var grandpa = event.target.parentNode.parentNode; 
  var grandpaId = grandpa.id;
  var articleId = grandpaId.replace("article_", "");

  var inputTitle = document.createElement("input");
  inputTitle.setAttribute("class", "new-title");
  inputTitle.setAttribute("style", "width: 80%"); 
  inputTitle.value = grandpa.querySelector(".article-title").innerText;
  grandpa.appendChild(inputTitle);

  var inputBody = document.createElement("textarea");
  inputBody.setAttribute("class", "new-body");
  inputBody.setAttribute("style", "width: 80%");
  inputBody.value = grandpa.querySelector(".article-body").innerText;
  grandpa.appendChild(inputBody);

  var updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  grandpa.appendChild(updateButton);

  updateButton.addEventListener("click", function() {
    patchArticle(articleId, inputTitle, inputBody).then(function(article) {
      updateArticleInDOM(article, grandpa, inputTitle, inputBody, updateButton);
    });
  });
}

function updateArticleInDOM(
  article,
  domElement,
  inputTitle,
  inputBody,
  updateButton
) {
  domElement.querySelector(".article-title").innerText = article.title;
  domElement.querySelector(".article-body").innerText = article.body;

  inputTitle.remove();
  inputBody.remove();
  updateButton.remove();

  domElement.querySelector(".article-edit").disabled = false;
}

function deleteArticleOnClick(event) {
  
  var grandpa = event.target.parentNode.parentNode; 
  var grandpaId = grandpa.id; 

  var articleId = grandpaId.replace("article_", ""); 

  deleteArticle(articleId).then(function(article) {
    removeArticleFromDOM(article, grandpa);
  });
}

function removeArticleFromDOM(article, domElement) {
  domElement.remove();
}


