const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const apiKey = '31712de0';

  const fetchMovies = async (searchTerm) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&t=${searchTerm}`);
      const data = await response.json();
      const movieList = document.getElementById('movie-list');
      movieList.innerHTML = '';
    //         data.data.forEach((movie) => {
    //         const li = document.createElement('li');
    //         li.textContent = movie.title;
    //         movieList.appendChild(li);
    // })
      if(data.results){
          data.results.forEach((movie) => {
            const li = document.createElement('li');
            li.textContent = movie.title;
            movieList.appendChild(li);
      })
      }else{
        console.log('No Movies Result Found');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearchChange = debounce((searchTerm) => {
    fetchMovies(searchTerm);
  }, 1000);

  const searchBar = document.getElementById('search-bar');

  searchBar.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    handleSearchChange(searchTerm);
  });
