

import { utilService } from './../services/util.service';



export class Move {
    constructor(public _id?: string,public to: string = '', public at: number = null, public amount: number = null) {
        // if(!this._id) this._id = utilService.makeId();
    }
}

