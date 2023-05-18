import { Link } from 'react-router-dom'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg' 
import rentCategoryImage from '../assets/jpg/sellCategoryImage.jpg' 
import Slider from '../components/Slider'
function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main >
        <Slider/>
        {/* slider */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='category/rent' >
            <img src={rentCategoryImage} alt="rent" 
            className='exploreCategoryImg'/>
             <p className='exploreCategoryName'> Place For Rent</p>
          </Link>
           
          <Link to='category/sale' >
            <img src={sellCategoryImage} alt="sell" 
            className='exploreCategoryImg'/>
             <p className='exploreCategoryName'> Place For Sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
