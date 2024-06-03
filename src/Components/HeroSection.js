import './css/heroSection.css';
import image from './image/HeroSection/HeroSection.png'
function HeroSection() {
  return (
    <section className='hero-section'>
      <div className="container">
        <div className='image'>
          <img src={image} className='w-100 h-90' />
        </div>
        <div className='content'>
          <p>Exclusive offer <span>30% Off</span></p>
          <h1>Stay home & delivered your <span>Daily Needs</span></h1>
          <p>Vegetables contain many vitamins and minerals that are good for your health.</p>
          <a className='btn '> Shop Now</a>
        </div>
      </div>
    </section>);
}
export default HeroSection;