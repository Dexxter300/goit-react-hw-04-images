import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import { Searchbar } from './searchbar/searchbar';
import { List } from './list/list';
import { Button } from './button/button';
import { Modal } from './modal/modal';

export const App = () => {
  const [imgs, setImgs] = useState([]);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [visible, setVisible] = useState(true);
  let inputText = useRef('');
  let page = useRef(1);

  useEffect(() => {
    setStatus('pending');

    findPics({ page: 1, promt: '' })
      .then(response => {
        // console.log(response);
        if (response.totalHits > 0) {
          // console.log('ok');
          return response;
        }

        return Promise.reject(new Error('someting went wrong'));
      })
      .then(res => {
        setImgs(res.hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, []);

  const handleSubmit = (e, promt) => {
    page.current = 1;
    // setPage(1);
    setVisible(true);
    setStatus('pending');
    inputText.current = promt;
    e.preventDefault();
    findPics({ promt, page: 1 })
      .then(response => {
        if (response.totalHits > 0) {
          return response;
        }
        return Promise.reject(new Error('someting went wrong'));
      })
      .then(res => {
        setImgs(res.hits);
        setStatus('resolved');
        return res;
      })
      .then(res => {
        if (res.hits >= res.totalHits) {
          // console.log(res.imgResponse);
          // console.log(response);
          setVisible(false);
        } else {
          setVisible(true);
        }
      })
      .catch(error => {
        // setState({ error, status: 'rejected' });
        setError(error);
        setStatus('rejected');
      });
  };

  const handleLoadMore = () => {
    page.current = page.current + 1;
    // console.log(page);
    // пофиксить страницы
    findPics({ page: page.current, promt: inputText.current })
      .then(res => {
        // console.log(page);
        setImgs(prevState => {
          return [...prevState, ...res.hits];
        });
        // console.log(res);
        return res;
      })
      .then(res => {
        if (imgs.length >= res.totalHits) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      });
  };

  const toggleModal = pickedImg => {
    // console.log(pickedImg);
    if (pickedImg) {
      setCurrentImg(pickedImg);
    }
    setShowModal(showModal => !showModal);
  };
  async function findPics({ promt, page }) {
    const response = await fetch(
      `https://pixabay.com/api/?q=${promt}&page=${page}&key=37419057-9cd64d5bcafa6da667183f7e4&image_type=photo&orientation=horizontal&per_page=12`
    );
    const pics = await response.json();
    // console.log(pics);
    return pics;
  }

  // render() {
  //   const { status, imgs, error, showModal } = this.state;

  if (status === 'pending') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmit}></Searchbar>
        <MagnifyingGlass></MagnifyingGlass>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmit}></Searchbar>
        <div>{error.message}</div>
      </div>
    );
  }

  if (status === 'resolved') {
    // console.log(state.currentImg);
    return (
      <div>
        {showModal && <Modal onClose={toggleModal} img={currentImg}></Modal>}
        <Searchbar onSubmit={handleSubmit}></Searchbar>
        <List imgs={imgs} onOpen={toggleModal}></List>
        {visible && <Button loadMore={handleLoadMore}></Button>}
      </div>
    );
  }
};
// }
