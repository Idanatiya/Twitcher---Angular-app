
import { utilService } from './../services/util.service';
export class Contact {
    constructor(public _id?: string,public name: string = '', public email: string = '', public phone: string = '',public role: string = 'Twitch User', public coins: number = 100 ) {
        // if(!this._id) this._id = utilService.makeId();
    }

    setId?() {
        this._id = utilService.makeId()
    }
}