import { LightningElement, api } from 'lwc';

export default class QuestionTile extends LightningElement {
    @api question;
    @api showrightanswer;
    @api testr;

    // connectedCallback(){
    //     this.testr1 = JSON.parse(JSON.stringify(this.testr));
    //     // eslint-disable-next-line no-console
    //     // console.log("2. testr1:"+ JSON.stringify(this.testr1));
    // }
    handleClick(event){
        // eslint-disable-next-line no-console
        console.log("event from row recieved:"+JSON.stringify(event));
        this.dispatchEvent(
            // Default values for bubbles and composed are false.
            new CustomEvent('qclick', { detail: event.detail })
        );
    }

}