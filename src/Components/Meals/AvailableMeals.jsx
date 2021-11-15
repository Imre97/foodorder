import { useState, useEffect } from 'react'

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()


  useEffect(() => {
    setLoading(true)
    setError()
    const getMeals = async () => {
      const data = await fetch('https://mealsorder-8a023-default-rtdb.firebaseio.com/meals.json')

      if (!data.ok) {
        throw new Error('Something went wrong')
      }

      const res = await data.json()

      const loadedData = []

      for (const key in res) {
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

      getMeals().catch((error) => {
        setLoading(false)
        setError(error.message)
      })

  }, [])


  return (
    <section className={classes.meals}>
      <ul>
        <Card>
          {error && <h2>{error}</h2>}
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