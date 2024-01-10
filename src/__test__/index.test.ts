import { expect, test, describe, mock } from 'bun:test';
import { PromiseAPlus } from '..';

describe('PromiseAPlus', () => {
  test('should resolve correctly for multiple .then()', () => {
    const promise = new PromiseAPlus((resolve, reject) => {
      resolve('resolved success!!');
    });

    promise
      .then((val) => {
        console.log('1st then value', val);
        expect(val).toBe('resolved success!!');
      })
      .then((val) => {
        console.log('2nd then val', val);
        // expect(val).toBeUndefined();
      })
      .then((val) => {
        console.log('3rd then val', val);
        // expect(val).toBeUndefined();
      });
  });

  test('should reject correctly', () => {
    const promise = new PromiseAPlus((resolve, reject) => {
      reject('rejected error!!');
    });

    promise
      .then((val) => {
        console.log('then value', val);
        expect(val).toBeUndefined();
      })
      .catch((reason) => {
        console.log('catch reason', reason);
        expect(reason).toBe('rejected error!!');
      });
  });

  test('should call onFulfilled callback when promise is resolved', (done) => {
    const promise = new PromiseAPlus((resolve) => {
      setTimeout(() => resolve('resolved success!!'), 100);
    });

    promise.then((val) => {
      expect(val).toBe('resolved success!!');
      done();
    });
  });

  test('should call onRejected callback when promise is rejected', (done) => {
    const promise = new PromiseAPlus((resolve, reject) => {
      setTimeout(() => reject('rejected error!!'), 100);
    });

    promise.catch((reason) => {
      expect(reason).toBe('rejected error!!');
      done();
    });
  });

  test('should call onFulfilled callback immediately when promise is already resolved', () => {
    const promise = new PromiseAPlus((resolve) =>
      resolve('resolved success!!')
    );

    promise.then((val) => {
      expect(val).toBe('resolved success!!');
    });
  });

  test('should call onRejected callback immediately when promise is already rejected', () => {
    const promise = new PromiseAPlus((resolve, reject) =>
      reject('rejected error!!')
    );

    promise.catch((reason) => {
      expect(reason).toBe('rejected error!!');
    });
  });

  test('should call finally callback regardless of promise outcome', (done) => {
    const finallyCallback = mock(() => {});

    let promise = new PromiseAPlus((resolve) => resolve('resolved success!!'));
    promise.finally(finallyCallback);
    setTimeout(() => {
      expect(finallyCallback).toHaveBeenCalled();
      done();
    }, 100);

    promise = new PromiseAPlus((resolve, reject) => reject('rejected error!!'));
    promise.finally(finallyCallback);
    setTimeout(() => {
      expect(finallyCallback).toHaveBeenCalled();
      done();
    }, 100);
  });
});
