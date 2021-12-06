// So, what tools do we have to tell JS to wait before
// starting to execute some piece of code? And what's
// the simplest tool?
//
// SPOILER: functions!
const aFunctionReturningAPromise = () => {
  return new Promise((resolve) => { 
    console.log(`Oh, hello, I'm the lazy code...`)
    console.log(`I'll be right back in a minute... (or so)`)
    resolve(true)
  })
};

console.log(`See? No sign of the lazy code.`);

(async () => { 
  console.log(`What triggers the execution?`);
  console.log(
    `Look ma: no parenthesis, no execution! Infact: you'll see a function here aside →`, 
    aFunctionReturningAPromise
  );
  console.log(`Unless... explicitly called:`);
  console.log(`That's so...`, await aFunctionReturningAPromise())
})()

