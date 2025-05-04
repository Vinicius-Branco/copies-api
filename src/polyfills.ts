export {};

declare global {
  interface PromiseConstructor {
    any<T>(promises: Promise<T>[]): Promise<T>;
  }
}

if (!Promise.any) {
  Promise.any = function <T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
      const errors: Error[] = [];
      let rejected = 0;

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch((error) => {
            errors[index] = error;
            rejected++;
            if (rejected === promises.length) {
              reject(new Error('All promises were rejected'));
            }
          });
      });
    });
  };
}
