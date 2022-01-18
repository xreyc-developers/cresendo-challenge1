import classes from './RecipeItem.module.css';

const RecipeItem = ({ recipe, onClick, api_base_uri }) => {
    const imgUrl = api_base_uri + recipe.images.small;
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={classes['recipe-item']} onClick={onClick}>
                <div><img src={imgUrl}/></div>
                <div>{recipe.title}</div>
                <div>{recipe.description}</div>
            </div>
        </div>
    )
}

export default RecipeItem;