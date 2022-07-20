import './Bookmark.css';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Bookmark({ id, title, link, deleteBookmark }) {
  return (
    <li className='bm-item'>
      <a href={link}>
        <img
          src={
            'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
            link +
            '&size=24'
          }
          alt={`${title} icon`}
          className='image'
        />
        <span className='bm-title'>{title}</span>
      </a>

      <RiDeleteBin6Line
        onClick={() => deleteBookmark(id)}
        className='btn-delete'
      />
    </li>
  );
}

export default Bookmark;
