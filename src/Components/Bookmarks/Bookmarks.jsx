import { useEffect, useState } from 'react';
import BookmarkForm from './BookmarkForm/BookmarkForm';
import BookmarkList from './BookmarkList/BookmarkList';
import './Bookmarks.css';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addBookmark = ({ id, bmTitle, bmLink }) => {
    setBookmarks(prevBookmarks => [
      ...prevBookmarks,
      {
        id: id,
        bmTitle: bmTitle,
        bmLink: bmLink,
      },
    ]);
    setShowForm(false);
  };

  const deleteBookmark = id => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(bm => bm.id !== id));
    console.log(id);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const json = localStorage.getItem('bookmarks');
    const loadedBookmarks = JSON.parse(json);
    if (loadedBookmarks) {
      setBookmarks(loadedBookmarks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(bookmarks);
    localStorage.setItem('bookmarks', json);
  }, [bookmarks]);

  return (
    <div className='bookmarks'>
      {showForm ? (
        <div className='bookmarks-container'>
          <div className='backdrop'>
            <BookmarkForm addBookmark={addBookmark} closeForm={closeForm} />
          </div>
          <BookmarkList
            bookmarks={bookmarks}
            openForm={openForm}
            deleteBookmark={deleteBookmark}
          />
        </div>
      ) : (
        <BookmarkList
          bookmarks={bookmarks}
          openForm={openForm}
          deleteBookmark={deleteBookmark}
        />
      )}
    </div>
  );
}

export default Bookmarks;
