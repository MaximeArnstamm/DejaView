import config from '../config/environment';

export function initialize(application) {
  if(config.electron) {
    ['fs', 'path', 'jszip'].forEach(moduleName => {
      application.register('service:node-' + moduleName, require(moduleName), { instantiate: false });
      application.inject('service:series-service', moduleName, 'service:node-' + moduleName);
    });
  }
}

export default {
  name: 'node-modules',
  initialize
};
