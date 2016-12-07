import config from '../config/environment';

export function initialize(appInstance) {
  if(!config.electron) {
    let seriesService = appInstance.lookup('service:series-service');
    seriesService.get('remoteUrls').pushObject(''); // add remote server itself as remote source
  }
}

export default {
  name: 'series-service',
  initialize
};
