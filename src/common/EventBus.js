// src/common/EventBus.js
const listeners = new Map();
export const EventBus = {
  on(evt, cb) {
    listeners.set(evt, [...(listeners.get(evt) || []), cb]);
  },
  off(evt, cb) {
    listeners.set(
      evt,
      (listeners.get(evt) || []).filter((f) => f !== cb)
    );
  },
  emit(evt, payload) {
    (listeners.get(evt) || []).forEach((f) => f(payload));
  },
};
