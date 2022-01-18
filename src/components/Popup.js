import classes from './Popup.module.css';

const Popup = ({ togglePopup, recipe, api_base_uri}) => {
    const imgUrl = api_base_uri + recipe.images.full;
    return (
        <>
            <div className={classes['popup-backdrop']} onClick={togglePopup}></div>
            <div className={classes['popup-wrap']}>
                <div>
                    <span>Recipe</span>
                    <span className={classes['popup-close'] + ' ' + 'lnr lnr-cross'} onClick={togglePopup}></span>
                </div>
                <div>
                    <img src={imgUrl}/>
                    <div className={classes['popup-main-details']}>
                        <div>{recipe.title}</div>
                        <div><b>Posted on:</b> {recipe.postDate}</div>
                        <div><b>Description:</b> {recipe.description}</div>
                        <div><b>Servings:</b> {recipe.servings}</div>
                        <div><b>Preparation Time:</b> {recipe.prepTime}</div>
                        <div><b>Servings:</b> {recipe.cookTime}</div>
                    </div>

                    <div className={classes['popup-ingredients']}>
                        <div>Ingredients:</div>
                        {recipe.ingredients.map(ingredient => (
                            <div className={classes['ingredient-item']} key={ingredient.uuid}>
                                <div><b>Name:</b> {ingredient.name}</div>
                                {ingredient.measurement && <div><b>Measurement:</b> {ingredient.measurement}</div>}
                                {ingredient.amount && <div><b>Amount:</b> {ingredient.amount}</div>}
                            </div>
                        ))}
                    </div>

                    <div className={classes['popup-directions']}>
                        <div>Directions:</div>
                        {recipe.directions.map((direction, index) => {
                            index++;
                            return (
                                <div className={classes['direction-item']} key={index}>
                                    <div>{index}. {direction.instructions}</div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Popup;