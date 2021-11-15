import { useState, useEffect } from 'react'

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const getMeals = async () => {
      const data = await fetch('https://mealsorder-8a023-default-rtdb.firebaseio.com/meals.json')
      const res = await data.json()

      const loadedData = []

      for(const key in res) {
        loadedData.push({
          id: key,
          name: res[key].name,
          price: res[key].price,
          descirption: res[key].description
        })
      }
      setMeals(loadedData)

      setLoading(false)

    }

    getMeals()
  }, [])

  return (
    <section className={classes.meals}>
      <ul>
        <Card>
          {loading && <h2>Loading...</h2>}
          {meals.map(meal => {
            return <MealItem 
              name={meal.name} 
              id={meal.id} 
              key={meal.id} 
              description={meal.description} 
              price={meal.price} 
            />
          })}
        </Card>

      </ul>
    </section>
  )
}

export default AvailableMeals