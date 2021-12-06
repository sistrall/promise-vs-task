// A piece of asynchronous code that you can decide
// when to start is often called a `task`.
type Task<T> = () => Promise<T>

const aBooleanReturningTask: Task<boolean> = 
  () => Promise.resolve(true);

const theSameTaskWithADifferentDefinition: Task<boolean> =
  async () => true;

// Also (and this a strict requirement): a task must never, ever fail.
const aTaskThatNeverFails: Task<boolean> = async () => {
  try {
    return true
  } catch (error) {
    return false   
  }
}

(async () => console.log(await aTaskThatNeverFails()))()

// A promise describes the result of an execution: it's eager
// Tasks don't execute until they're called: they're lazy
// Task describes an execution
// We can run a task multiple times
