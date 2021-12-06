// Using `await` doesn't change a thing: 
// we can consider it pure syntactic sugar for `then`.
// Still, the word is kind-of misleading like `then`:
// if I'm await for something to happen, I can easily suppose
// that it happens while I wait, not necessarily that it 
// already happened.
//
// It's a bit more complex to show the behaviour.
(async () => {
  const aPromise = new Promise((resolve) => {
    console.log("Hey, humble success callback here.");
    console.log("I'll make the promise resolve to `true` in a moment.");
    console.log("But, in the meantime, I'm already executed code! 😜")

    resolve(true);
  })

  const aResolvedValue = await aPromise

  console.log(`And here is the promise resolution: ${aResolvedValue}`);

  return true;
})()