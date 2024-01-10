enum PromiseStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

export class PromiseAPlus {
  private status: PromiseStatus | undefined = PromiseStatus.Pending;
  private value: any = null;
  private reason: any = null;
  private onFulfilledCallbacks: Array<(value: any) => void> = [];
  private onRejectedCallbacks: Array<(reason: any) => void> = [];

  constructor(
    executor: (
      resolve: (value: unknown) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: any) {
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.Fulfilled;
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  }

  private reject(reason: any) {
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.Rejected;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  }

  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any) {
    if (this.status === PromiseStatus.Fulfilled) {
      onFulfilled && onFulfilled(this.value);
    } else if (this.status === PromiseStatus.Rejected) {
      onRejected && onRejected(this.reason);
    } else {
      onFulfilled && this.onFulfilledCallbacks.push(onFulfilled);

      onRejected && this.onRejectedCallbacks.push(onRejected);
    }

    return this;
  }

  catch(onRejected: (reason: any) => any) {
    if (this.status === PromiseStatus.Rejected) {
      onRejected(this.reason);
    } else {
      this.onRejectedCallbacks.push(onRejected);
    }
    return this;
  }

  finally = (callback: () => void) => {
    callback();
    return this;
  };
}
