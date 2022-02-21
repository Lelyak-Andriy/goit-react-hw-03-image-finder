function fetchTitle(title, page) {
  return fetch(
    `https://pixabay.com/api/?key=24769515-7151fb4d93d5940551af86767&q=${title}&page=${page}&per_page=12`
  )
    .then(response => {
      return response.json();
    })
    .then(gallery => {
      // console.log(gallery.hits);
      return gallery.hits;
    });
}

const api = { fetchTitle };
export default api;
