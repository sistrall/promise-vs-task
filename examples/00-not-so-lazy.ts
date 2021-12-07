// Javascript promises are not lazy as they look:
// the `then` method somewhat suggests that 
// the executor (the callback passed to the `Promise` constructor) 
// at the last moment, just before the `then` function is executed.
//
// It's easy to prove that that's not the case:
new Promise((resolve) => { 
  console.log("Oh my! That's weird: no `then`, but this log is indeed displayed.");

  resolve(true);
});
