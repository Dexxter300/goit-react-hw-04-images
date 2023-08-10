import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import { Searchbar } from './searchbar/searchbar';
import { List } from './list/list';
import { Button } from './button/button';
import { Modal } from './modal/modal';

export class App extends Component {
  state = {
    imgs: [],
    status: 'pending',
    error: null,
    showModal: false,
    currentImg: null,
    visible: true,
  };
  inputText = '';
  page = 1;

  componentDidMount() {
    this.setState({ status: 'pending' });

    this.findPics({ page: 1, promt: '' })
      .then(response => {
        // console.log(response);
        if (response.totalHits > 0) {
          // console.log('ok');
          return response;
        }

        return Promise.reject(new Error('someting went wrong'));
      })
      .then(res => {
        this.setState({
          imgs: res.hits,
          status: 'resolved',
        });
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  }

  handleSubmit = (e, promt) => {
    this.page = 1;
    this.setState({ status: 'pending' });
    this.inputText = promt;
    e.preventDefault();
    this.findPics({ promt, page: 1 })
      .then(response => {
        if (response.totalHits > 0) {
          return response;
        }
        return Promise.reject(new Error('someting went wrong'));
      })
      .then(res => {
        this.setState({
          imgs: res.hits,
          status: 'resolved',
        });
        return res;
      })
      .then(res => {
        if (this.state.imgs.length >= res.totalHits) {
          this.setState({
            visible: false,
          });
        } else {
          this.setState({
            visible: true,
          });
        }
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  handleLoadMore = () => {
    this.page = this.page + 1;
    // пофиксить страницы
    this.findPics({ page: this.page, promt: this.inputText })
      .then(res => {
        this.setState(prevState => {
          return { imgs: [...prevState.imgs, ...res.hits] };
        });
        console.log(res);
        return res;
      })
      .then(res => {
        if (this.state.imgs.length >= res.totalHits) {
          this.setState({
            visible: false,
          });
        } else {
          this.setState({
            visible: true,
          });
        }
      });
  };

  toggleModal = currentImg => {
    // console.log(currentImg);
    if (currentImg) {
      this.setState({ currentImg: currentImg });
    }
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  async findPics({ promt, page }) {
    const response = await fetch(
      `https://pixabay.com/api/?q=${promt}&page=${page}&key=37419057-9cd64d5bcafa6da667183f7e4&image_type=photo&orientation=horizontal&per_page=12`
    );
    const pics = await response.json();
    // console.log(pics);
    return pics;
  }

  render() {
    const { status, imgs, error, showModal } = this.state;

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit}></Searchbar>
          <MagnifyingGlass></MagnifyingGlass>
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit}></Searchbar>
          <div>{error.message}</div>
        </div>
      );
    }

    if (status === 'resolved') {
      // console.log(this.state.currentImg);
      return (
        <div>
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              img={this.state.currentImg}
            ></Modal>
          )}
          <Searchbar onSubmit={this.handleSubmit}></Searchbar>
          <List imgs={imgs} onOpen={this.toggleModal}></List>
          {this.state.visible && (
            <Button loadMore={this.handleLoadMore}></Button>
          )}
        </div>
      );
    }
  }
}
