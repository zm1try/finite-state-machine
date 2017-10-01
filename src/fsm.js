class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    
    constructor(config) {
        if (typeof config == 'undefined')
            throw new Error('config isn\'t passed');
        this.config = config;
        this.stack = [config['initial']];
        this.index = 0;
        this.available = 0;
    }
    
        
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stack[this.index];        
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(state in this.config['states']))
            throw new Error('state isn\'t exist');
        this.stack.push(state);
        this.index++;
        this.available = 0;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!(event in this.config.states[this.stack[this.index]].transitions))
            throw new Error('event in current state isn\'t exist');
        this.stack.push(this.config.states[this.stack[this.index]].transitions[event]);
        this.index++;
        this.available = 0;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stack.push(this.config['initial']);
        this.index++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) return Object.keys(this.config.states);
        if (!(event in Object.keys(this.config.states))) return [];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.index == 0)
            return false;
        this.index--;
        this.available++;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.available == 0){
            return false;
        }
        this.index++;
        this.available--;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stack = [this.config['initial']];
        this.index = 0;
        this.available = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
