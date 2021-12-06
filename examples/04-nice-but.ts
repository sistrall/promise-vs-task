// So, Task is nice, 'cause we can decide when it runs.
// Is it all? Is there anything else we can do with tasks apart from running them?

type Reservation = {
  id: number;
  restaurantId: number;
}

type Restaurant = {
  id: number;
  title: string;
}

const getRestaurant = (id: number) => Promise.resolve({ response: Promise.resolve({ id, title: String.fromCharCode(65 + id) }) });
const getReservation = (id: number) => Promise.resolve({ response: Promise.resolve({ id, restaurantId: Math.floor(id / 10) }) });

const mount = (reservation: Reservation, restaurant: Restaurant) => ({ ...reservation, restaurant });

// Fully thenable
(async () => {
  return getReservation(13)
    .then(({ response }) => response)
    .then((reservation) => {
      return getRestaurant(reservation.restaurantId)
        .then(({ response }) => response)
        .then((restaurant) => {
          console.log('Fully thenable', JSON.stringify(mount(reservation, restaurant)));
        })
    })
})();

// Using then
(async () => {
  const reservation = await getReservation(13).then(({ response }) => response);
  const restaurant = await getRestaurant(reservation.restaurantId).then(({ response }) => response);

  console.log('Partially awaiting', JSON.stringify(mount(reservation, restaurant)));
})();

// Using async/await
(async () => {
  const reservation = await (await getReservation(13)).response;
  const restaurant = await (await getRestaurant(reservation.restaurantId)).response;
  
  console.log('Only awaiting', JSON.stringify(mount(reservation, restaurant)));
})();  

// A bit weird in any case... What if we could compose functions?