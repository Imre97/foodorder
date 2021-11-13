import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input.jsx"

const MealItemForm = props => {
    return (
        <form className={classes.form}>
            <Input label="Amount" input={{type: 'number', id: 'amount_' + props.id, min:'1', max: '5', step: '1', defaultValue: '1'}} />
            <button>+ add</button>
        </form>
    )
}

export default MealItemForm