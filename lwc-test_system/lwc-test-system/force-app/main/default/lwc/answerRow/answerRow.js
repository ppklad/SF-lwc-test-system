import { LightningElement, api, track } from 'lwc';

export default class AnswerRow extends LightningElement {
    @api answer;
    @track answerChoosen=false;
    @track answerIsRight;
    // progress_ring_class;
    // connectedCallback(){
    //     // eslint-disable-next-line no-console
    //     console.log("this.answer:"+ JSON.stringify(this.answer));
    // }
    handleAnswerClick(){
        // eslint-disable-next-line no-console
        // console.log("click");
        this.answerChoosen =  !this.answerChoosen;
        this.answerIsRight = this.answer.Is__c;
    }
}
