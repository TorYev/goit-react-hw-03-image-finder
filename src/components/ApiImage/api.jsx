export const fetchData = async (query, pageNumber) => {
  const apiKey = '42101269-8c4d520152e5b925cc1944b87';
  const perPage = 12;
  const url = `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
