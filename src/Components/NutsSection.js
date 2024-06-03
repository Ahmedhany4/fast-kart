import './css/NutsSection.css';
import image from './image/NutsSection/Nuts.png'

function NutsSection() {
  return (
    <section className='nuts-section'>
      <h1 >Nuts Section</h1>
      <div className="container">
        <div className='image'>
          <img src={image} className='w-100 h-90' />
        </div>
        <div className='content'>
          <p>Weekend special offer</p>
          <h1>Premium Quality Dry Fruits</h1>
          <h3>Dryfruits shopping made Easy</h3>
          <p>Fresh & Top Quality Dry Fruits are available here!</p>
          <a className='btn'> Shop Now</a>
        </div>
      </div>
    </section>
  );
}
export default NutsSection;