import { LightningElement, api, track } from 'lwc';

export default class AnswerRow extends LightningElement {
    @api answer;
    @api showrightanswer;

    @track answerChoosen ;
    @track answerIsRight ;
    @track showrightanswer;
    // progress_ring_class = ((!this.answerChoosen || !this.showrightanswer) ? "slds-progress-ring slds-progress-ring_large" :  (this.answerIsRight) ? "slds-progress-ring slds-progress-ring_large slds-progress-ring_complete" : "slds-progress-ring slds-progress-ring_large slds-progress-ring_expired"); //"slds-progress-ring slds-progress-ring_large";

    // @track showrightanswer;

    connectedCallback(){
        // eslint-disable-next-line no-console
        // console.log(">>>connectedCallback"+JSON.stringify(this.answer)); 
       
        this.answerChoosen = this.answer.answerChoosen;
        this.answerIsRight = this.answer.Is__c;
        // this.progress_ring_class_setting();

     }
    handleAnswerClick(){
        this.answerChoosen =  !this.answerChoosen;
        this.answerIsRight = this.answer.Is__c;
        // this.progress_ring_class_setting();
        this.dispatchEvent(new CustomEvent('getaid', { detail: this.answer.Id }));
    }

    get show_default(){
        return this.getAnswerVariant()==="default" ? true : false;
    }
    get show_check(){
        return this.getAnswerVariant()==="check" ? true : false;
    }
    get show_right_check(){
        return this.getAnswerVariant()==="right_check" ? true : false;
    }
    get show_wrong_check(){
        return this.getAnswerVariant()==="wrong_check" ? true : false;
    }
    //
    //Helpers
    //
    getAnswerVariant(){
        if( !this.answerChoosen && !this.showrightanswer ){
            return "default"
        }else if( this.answerChoosen && !this.showrightanswer ) {
            return "check"
        }else if( this.answerChoosen && this.showrightanswer && this.answerIsRight) {
            return "right_check"
        }else if( this.answerChoosen && this.showrightanswer && !this.answerIsRight) {
            return "wrong_check"
        }
            return "";
        
    }
    // progress_ring_class_setting(){
    //     // eslint-disable-next-line no-console
    //     // console.log("определение класса колечка");
    //     if(this.answerIsRight && this.answerChoosen && this.showrightanswer){
    //             this.progress_ring_class += " slds-progress-ring_complete";  
    //     }else if(!this.answerIsRight && this.answerChoosen && this.showrightanswer){
    //             this.progress_ring_class += " slds-progress-ring_expired";
    //     }else {
    //         this.progress_ring_class = "slds-progress-ring slds-progress-ring_large";
    //     }
    // }

}