import './directory.style.scss'
import CategoryItem from '../category-item/category-item.component'


const Directory = ({categories})=>{
    return(
        <div className="directory-container">
        {categories.map((categorie) => (
          <CategoryItem key={categorie.id} categories={categorie}/>
        ))}
      </div>
    )
}

export default Directory