import Lux from "@lespantsfancy/lux";

import Enum from "./enum/package";

export default class Task extends Lux.Node.Struct {
    constructor(value, { order = 1, children = [] } = {}) {
        super({
            Value: value,

            Order: order,
            Children: children,

            Timer: new Lux.Node.Struct({
                Type: Enum.Time.STOPWATCH,
                Start: null,
                Sprints: []
            }),

            //* This feels really hacky, but leaving here until a cleaner solution is relevant
            _nonce: null,           // A pseudo-nonce to force a "change" event
            _nonceHz: null,         // The frequency of the loop
            _loop: null,            // A holder for the setInterval return value
        });
    }

    BeginLoop(interval = 500) {
        this._loop = setInterval(() => this._nonce = Math.random(), interval);
        this._nonceHz = interval;

        return this;
    }
    EndLoop() {
        clearInterval(this._loop);
        this._loop = null;

        return this;
    }

    StartTime() {
        this.Timer.Start = Date.now();

        return this;
    }
    StopTime() {
        if(this.Timer.Start) {
            let elapsed = Date.now() - this.Timer.Start;
            
            this.Timer.Start = null;
            this.Timer.Sprints.push(elapsed);

            return true;
        }

        return false;
    }

    GetCurrentTime() {
        if(this.Timer.Start) {
            return Date.now() - this.Timer.Start;
        }

        return 0;
    }
    GetTotalTime(sprintsOnly = false) {
        let sprints = this.Timer.Sprints.reduce((a, v) => a + v, 0);

        if(sprintsOnly) {
            return sprints;
        }

        return sprints + this.GetCurrentTime();
    }
};