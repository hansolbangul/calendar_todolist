const eventBus = {
  on(event, callback) {
    document.addEventListener(event, callback);
  },
  emit(event, data) {
    // create a custom event
    const myEvent = new CustomEvent(event, { detail: data });
    // dispatch the event
    document.dispatchEvent(myEvent);
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;