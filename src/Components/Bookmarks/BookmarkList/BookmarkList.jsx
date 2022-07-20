import Bookmark from '../Bookmark/Bookmark';
import './BookmarkList.css';

function BookmarkList({ bookmarks, deleteBookmark, openForm }) {
  return (
    <section className='bookmark-list'>
      <header>
        <h3>Bookmarks</h3>
        <button className='btn-control btn-add' onClick={openForm}>
          Add New +
        </button>
      </header>

      <div className='bms-container'>
        <ul className='bms-list'>
          {bookmarks &&
            bookmarks.map(bm => (
              <Bookmark
                id={bm.id}
                title={bm.bmTitle}
                link={bm.bmLink}
                key={bm.id}
                deleteBookmark={deleteBookmark}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default BookmarkList;
