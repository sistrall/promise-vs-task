import { flow } from 'fp-ts/function'

type Task<T> = () => Promise<T>

type Reservation = {
  id: number;
  restaurantId: number;
}

const getReservation = (id: number): Task<Reservation> => () => Promise.resolve({ id, restaurantId: Math.floor(id / 10) });
const getRestaurantId = ({ restaurantId }: Reservation) => restaurantId

// By introducing a `map` function, I can start to reason in terms of
// mathematical composition without thinking about promises anymore.
// 
// It could seem that reasoning with `Task`s is not so different from
// reasoning with `Promise`s: both are complex enough to require some
// effort to think about.
// 
// It turns out `Task` has some less-visible advantages. As an example,
// `Promise`'s `catch` is not typed: that can lead weird bugs. By definition
// `Task`s cannot fail: that makes the error management mandatory by
// using tools made on purpose to properly manage exceptions. What's even more
// interesting is that, even including errors in the scope, it's possible 
// to keep thinking in terms of composition and other mathematical constructs.

// Map transforms functions `B -> C` into functions `Task<B> -> Task<C>`
// Not so easy to read (and TypeScript doesn't help): it takes some time to digest.
const map = <B, C>(g: (b: B) => C) => 
  (fb: Task<B>): Task<C> => 
    () => fb().then(g); // <-- this is a Task: a function without arguments returning a `Promise`

// Look ma! No then, no await!
const getReservationRestaurantId = flow(
  getReservation, 
  map(getRestaurantId)
);

// I could work with `await`, but...
// (async () => {
//   console.log(await (getReservationRestaurantId(26)()))
// })()

// ...since the oddities due to `Promise` are hidden into the box,
// a simple `then` is probably more readanle:
getReservationRestaurantId(26)().then(console.log)

