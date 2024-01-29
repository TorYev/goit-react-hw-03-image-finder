import React, { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchData } from './ApiImage/api';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    await loadImages(value, 1);
  };

  const handleLoadMore = async () => {
    await loadImages(query, page + 1);
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const loadImages = async (query, pageNumber) => {
    setLoading(true);
    try {
      const newImages = await fetchData(query, pageNumber);
      setImages(prev => [...prev, ...newImages]);
      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      loadImages(query, page);
    }
  }, [query, page]);

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && <Button onLoadMore={handleLoadMore} />}
      {selectedImage && (
        <Modal onCloseModal={handleCloseModal} imageUrl={selectedImage} />
      )}
      {loading && <Loader />}
    </AppContainer>
  );
};

export default App;
