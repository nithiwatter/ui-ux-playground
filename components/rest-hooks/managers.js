import { NetworkManager } from '@rest-hooks/core';

class ModifiedNetworkManager extends NetworkManager {
  getMiddleware() {
    const networkMiddleware = super.getMiddleware();

    return networkMiddleware;
  }
}

export { ModifiedNetworkManager };
