import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandsIcons from '@fortawesome/free-brands-svg-icons';
function Category({category }) {

  return (
    <>
      <div className="item">
        <div className="image">
          <img src={category .image} alt={category .title} />
        </div>
        <div className='content'>
          <p>{category .p}</p>
          <h2>{category .title}</h2>
          <a className='btn '> Shop Now <FontAwesomeIcon icon={solidIcons.faAngleRight} /></a>
          
        </div>
      </div>
    </>
  );
}
export default Category;