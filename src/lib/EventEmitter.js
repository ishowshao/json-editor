class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!Array.isArray(this.events[eventName])) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(listener);
    }

    removeListener(eventName, listener) {
        if (Array.isArray(this.events[eventName])) {
            const index = this.events[eventName].indexOf(listener);
            if (index > -1) {
                this.events[eventName].splice(index, 1);
            }
        }
    }

    emit(eventName) {
        const args = [].slice.call(arguments, 1);

        if (Array.isArray(this.events[eventName])) {
            const listeners = this.events[eventName].slice();
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].apply(this, args);
            }
        }
    }

    once(eventName, listener) {
        this.on(eventName, function g () {
            this.removeListener(eventName, g);
            listener.apply(this, arguments);
        });
    }
}

export default EventEmitter;