class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    
    constructor(config) {
        if (!config)
            throw new Error();
        else this.info = config;

    }
    
        
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.info.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (state === 'normal' || state === 'busy' || state === 'sleeping'|| state === 'hungry') var a = 1;
        else throw new Error();

        
        if (this.info.initial === state) {
            //console.log(this.info.initial);
            return this.info.initial;}
        else {
            switch(this.info.initial) {
                case 'normal': 
                    switch(state) {
                        case 'busy': 
                            this.info.initial = this.info.states.normal.transitions.study;
                            break;
                        case 'sleeping':
                            this.info.initial = this.info.states.normal.transitions.study;
                            this.info.initial = this.info.states.busy.transitions.get_tired;
                            break;
                        case 'hungry':
                            this.info.initial = this.info.states.normal.transitions.study;
                            this.info.initial = this.info.states.busy.transitions.get_hungry;
                            break;
                    };
                    break;
                case 'busy':
                    switch(state) {
                        case 'normal':
                            this.info.initial = this.info.states.busy.transitions.get_hungry;
                            this.info.initial = this.info.states.hungry.transitions.eat;
                            break;
                        case 'sleeping':
                            this.info.initial = this.info.states.busy.transitions.get_tired;
                            break;
                        case 'hungry':
                            this.info.initial = this.info.states.busy.transitions.get_hungry;
                            break;
                    };
                    break;
                case 'sleeping':
                    switch(state) {
                        case 'normal':
                            this.info.initial = this.info.states.sleeping.transitions.get_up;
                            break;
                        case 'busy':
                            this.info.initial = this.info.states.sleeping.transitions.get_up;
                            this.info.initial = this.info.states.normal.transitions.study;
                            break;
                        case 'hungry':
                            this.info.initial = this.info.states.sleeping.transitions.get_hungry;
                            break;
                    };
                    break;
                case 'hungry':
                    switch(state) {
                        case 'normal':
                            this.info.initial = this.info.states.hungry.transitions.eat;
                            break;
                        case 'busy':
                            this.info.initial = this.info.states.hungry.transitions.eat;
                            this.info.initial = this.info.states.normal.transitions.study;
                            break;
                        case 'sleeping':
                            this.info.initial = this.info.states.hungry.transitions.eat;
                            this.info.initial = this.info.states.normal.transitions.study;
                            this.info.initial = this.info.states.busy.transitions.get_tired;
                            break;
                    };
                    break;
            }
        }   return this.info.initial;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        
        /*switch(this.info.initial) {
            case 'normal': 
                if (event == 'study') break;
                else throw new Error();
            case 'busy':
                if (event == 'get_tired'|| event === 'get_hungry') break;
                else throw new Error();
            case 'sleeping':
                if (event == 'get_hungry'|| event === 'get_up') break;
                else throw new Error();
            case 'hungry':
                if (event == 'eat') break;
                else throw new Error();
        }*/

        /*if (event === 'study' || event === 'eat' || event === 'get_tired'|| event === 'get_hungry'|| event === 'get_up') var a = 1;
        else throw new Error;
        console.log(this.info.initial);*/

        switch(this.info.initial) {
            case 'normal':
                switch(event) {
                    case 'study':
                        this.info.initial = this.info.states.normal.transitions.study;
                        break;
                    case 'eat':
                        /*this.info.initial = this.info.states.normal.transitions.study;
                        this.info.initial = this.info.states.busy.transitions.get_hungry;
                        this.info.initial = this.info.states.hungry.transitions.eat;*/
                        break;
                    case 'get_tired':
                        this.info.initial = this.info.states.normal.transitions.study;
                        this.info.initial = this.info.states.busy.transitions.get_tired;
                        break;
                    case 'get_hungry':
                        this.info.initial = this.info.states.normal.transitions.study;
                        this.info.initial = this.info.states.busy.transitions.get_hungry;
                        break;
                    case 'get_up':
                        /*this.info.initial = this.info.states.normal.transitions.study;
                        this.info.initial = this.info.states.busy.transitions.get_hungry;*/
                        break;
                    /*default: throw new Error;
                        break;*/
                };
                break;
            case 'busy':
                switch(event) {
                    case 'study':
                        break;
                    case 'eat':
                        this.info.initial = this.info.states.busy.transitions.get_hungry;
                        this.info.initial = this.info.states.hungry.transitions.eat;
                        break;
                    case 'get_tired':
                        this.info.initial = this.info.states.busy.transitions.get_tired;
                        break;
                    case 'get_hungry':
                        this.info.initial = this.info.states.busy.transitions.get_hungry;
                        break;
                    case 'get_up':
                        this.info.initial = this.info.states.busy.transitions.get_tired;
                        this.info.initial = this.info.states.sleeping.transitions.get_up;
                        break;
                    /*default: throw new Error;
                        break;*/
                };
                break;
            case 'sleeping':
                switch(event) {
                    case 'study':
                        this.info.initial = this.info.states.sleeping.transitions.get_up;
                        this.info.initial = this.info.states.normal.transitions.study;
                        break;
                    case 'eat':
                        this.info.initial = this.info.states.sleeping.transitions.get_hungry;
                        this.info.initial = this.info.states.hungry.transitions.eat;
                        break;
                    case 'get_tired':
                        break;
                    case 'get_hungry':
                        this.info.initial = this.info.states.sleeping.transitions.get_hungry;
                        break;
                    case 'get_up':
                        this.info.initial = this.info.states.sleeping.transitions.get_up;
                        break;
                    /*default: throw new Error;
                        break;*/
                };
                break;
            case 'hungry':
                switch(event) {
                    case 'study':
                        this.info.initial = this.info.states.hungry.transitions.eat;
                        this.info.initial = this.info.states.normal.transitions.study;
                        break;
                    case 'eat':
                        this.info.initial = this.info.states.hungry.transitions.eat;
                        break;
                    case 'get_tired':
                        this.info.initial = this.info.states.normal.transitions.study;
                        this.info.initial = this.info.states.busy.transitions.get_tired;
                        break;
                    case 'get_hungry':
                        break;
                    case 'get_up':
                        this.info.initial = this.info.states.busy.transitions.get_hungry;
                        this.info.initial = this.info.states.busy.transitions.get_tired;
                        this.info.initial = this.info.states.sleeping.transitions.get_up;
                        break;
                    /*default: throw new Error;
                        break;*/
                };
                break;
        };
        return this.info.initial;
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

        switch(this.info.initial) {
            case 'normal': 
                break;
            case 'busy':
                this.info.initial = this.info.states.busy.transitions.get_hungry;
                this.info.initial = this.info.states.hungry.transitions.eat;
                break;
            case 'sleeping':
                this.info.initial = this.info.states.sleeping.transitions.get_up;
                break;
            case 'hungry':
                this.info.initial = this.info.states.hungry.transitions.eat;
                break;
        }

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        if (!event) return ['normal','busy','hungry','sleeping'];
        switch(event) {
            case 'study':
                return ['normal'];
                break;
            case 'eat':
                return ['hungry'];
                break;
            case 'get_tired':
                return ['busy'];
                break;
            case 'get_hungry':
                return ['busy','sleeping'];
                break;
            case 'get_up':
                return ['sleeping'];
                break;
            default: 
                return [];
                break;
        };
        //console.log(this.info.states);
        //if(!event) return this.info;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.info.initial == 'normal') return false;
        else {
            switch(this.info.initial) {
                case 'busy':
                    this.info.initial = this.info.states.busy.transitions.get_hungry;
                    this.info.initial = this.info.states.hungry.transitions.eat;
                    return true;
                    break;
                case 'sleeping':
                    this.info.initial = this.info.states.sleeping.transitions.get_up;
                    return true;
                    break;
                case 'hungry':
                    this.info.initial = this.info.states.hungry.transitions.eat;
                    return true;
                    break;
            }
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.info.initial == 'normal') return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
