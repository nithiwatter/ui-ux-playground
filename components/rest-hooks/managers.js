import { Manager, NetworkManager } from '@rest-hooks/core';

class ModifiedNetworkManager extends NetworkManager {
  getMiddleware() {
    const networkMiddleware = super.getMiddleware();

    return networkMiddleware;
  }
}

class ModifiedMiddleManager {
  getMiddleware() {
    return ({ getState, controller }) =>
      (next) =>
      async (action) => {
        // console.log(getState());
        console.log(action.type);
        next(action);
      };
  }

  cleanup() {}
}

export { ModifiedMiddleManager, ModifiedNetworkManager };
