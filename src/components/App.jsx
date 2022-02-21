import { Component } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import titleFetchAPI from './fetchTitleAPI';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import Modal from './Modal/Modal';

class App extends Component {
  state = {
    title: '',
    showModal: false,
    error: null,
    page: 1,
    largeImageId: null,
    gallery: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextTitle = this.state.title;
    const nextPage = this.state.page;

    const { title } = this.state;

    if (prevState.title !== nextTitle || prevState.page !== nextPage) {
      this.setState({ loading: true });
      titleFetchAPI
        .fetchTitle(nextTitle, nextPage)
        .then(gallery => {
          if (!gallery.length) {
            this.setState({ gallery: [] });
            Notify.failure(
              `Unsuccessful search result for ${title}. Try again, please`
            );
            return;
          }

          if (!this.state.gallery || prevState.title !== nextTitle) {
            this.setState({
              gallery,
            });
          } else {
            this.setState({
              gallery: [...prevState.gallery, ...gallery],
            });
            this.scroll();
            return;
          }
        })

        .catch(error => {
          this.setState({ error });
          Notify.failure(
            `Unsuccessful search result for ${title}. Try again, please`
          );
          return;
        })

        .finally(() => this.setState({ loading: false }));
    }
  }

  handleformSubmit = title => {
    this.setState({ title });
  };

  onClickLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  onOpenModal = e => {
    this.setState({
      showModal: true,
      largeImageId: Number(e.target.id),
    });
  };

  onCloseModal = e => {
    this.setState({
      showModal: false,
    });
  };

  onSearchLargeImg = () => {
    const { gallery, largeImageId } = this.state;

    const largeImg = gallery.find(image => {
      return image.id === largeImageId;
    });
    return largeImg;
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { loading, gallery, error, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleformSubmit} />

        {loading && <Loader />}

        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onOpen={this.onOpenModal} />
        )}

        {gallery.length >= 12 && <Button onClick={this.onClickLoadMore} />}

        {showModal && (
          <Modal onClose={this.onCloseModal}>
            {
              <img
                src={this.onSearchLargeImg().largeImageURL}
                alt={this.onSearchLargeImg().tags}
              />
            }
          </Modal>
        )}

        {error && error}
      </>
    );
  }
}

export default App;
