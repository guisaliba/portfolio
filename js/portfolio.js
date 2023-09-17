//fetch
fetch('https://dev.to/api/articles?username=guisaliba')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not fetch resource.');
    }

    return response.json();
  })
  .then((response) => {
    const articles = response;
    const list = document.querySelector('.posts-list');

    for (const article of articles) {
      const listItem = document.createElement('li');

      const link = document.createElement('a');
      link.href = article.url;
      link.classList.add('article-link');
      link.textContent = article.title;
      link.style.textDecoration = 'underline';

      const articleDate = document.createElement('p');
      articleDate.innerHTML = new Date(
        article.published_at
      ).toLocaleDateString();
      articleDate.classList.add('article-date');

      listItem.appendChild(link);
      listItem.appendChild(articleDate);
      list.appendChild(listItem);
    }
  });
