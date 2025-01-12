fetch("https://dev.to/api/articles?username=guisaliba")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not fetch user articles.");
    }

    return response.json();
  })
  .then((response) => {
    const articles = response;
    const list = document.querySelector(".posts-list");

    for (const article of articles) {
      const listItem = document.createElement("li");

      const articleUrl = document.createElement("a");
      articleUrl.href = article.url;
      articleUrl.classList.add("article-link");

      const truncatedTitle = article.title.substring(
        0,
        Math.min(45, article.title.length)
      );

      articleUrl.textContent = truncatedTitle;
      articleUrl.style.textDecoration = "underline";

      const articleDate = document.createElement("p");
      articleDate.innerHTML = new Date(
        article.published_at
      ).toLocaleDateString();
      articleDate.classList.add("article-date");

      listItem.appendChild(articleUrl);
      listItem.appendChild(articleDate);

      list.appendChild(listItem);
    }
  });
