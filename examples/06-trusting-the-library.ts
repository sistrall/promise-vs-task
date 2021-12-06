import { flow } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import { Task } from 'fp-ts/Task'

type Reservation = {
  id: number;
  restaurantId: number;
}

const getReservation = (id: number): Task<Reservation> => () => Promise.resolve({ id, restaurantId: Math.floor(id / 10) });
const getRestaurantId = ({ restaurantId }: Reservation) => restaurantId

const getReservationRestaurantId = flow(
  getReservation, 
  T.map(getRestaurantId)
)

getReservationRestaurantId(26)().then(console.log)
