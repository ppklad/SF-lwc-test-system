import { LightningElement, api, track } from 'lwc';

export default class AnswerRow extends LightningElement {
    @api answer;
    @api showrightanswer;
    @api testr;
    @api question;

    @track answerChoosen=false;
    @track answerIsRight;
    @track progress_ring_class = "slds-progress-ring slds-progress-ring_large";
    // connectedCallback(){
    // }
    handleAnswerClick(){
        // eslint-disable-next-line no-console
        // console.log("question:"+JSON.stringify(this.question) );
        // eslint-disable-next-line no-console
        console.log("testr:"+JSON.stringify(this.testr) );
        this.addAnswerToAnswersResults(this.testr,this.question,this.answer)

        this.answerChoosen =  !this.answerChoosen;
        this.answerIsRight = this.answer.Is__c;
        if(this.answerIsRight && this.answerChoosen){
            if(this.showrightanswer){ //проверка что нажата кнопка check
                this.progress_ring_class += " slds-progress-ring_complete";
            }else {
                this.progress_ring_class = "slds-progress-ring slds-progress-ring_large";
            }
            
        }else if(!this.answerIsRight && this.answerChoosen){
            if(this.showrightanswer){ //проверка что нажата кнопка check
                this.progress_ring_class += " slds-progress-ring_expired";
            }else {
                this.progress_ring_class = "slds-progress-ring slds-progress-ring_large";
            }
        }else {
            this.progress_ring_class = "slds-progress-ring slds-progress-ring_large";
        }
            // eslint-disable-next-line no-console
            // console.log("this.showrightanswer:"+JSON.stringify(this.showrightanswer) );

            
        
    }



    //
    //Helpers
    //
    addAnswerToAnswersResults(testr,question,answer){
        // let answerresults = testr.Answer_results__r;
        
        // eslint-disable-next-line no-console
        console.log("here:" );

        let newanswerresult = {
            Test_result__c: testr.Id,
            Name: answer.Name,
            Question__c: question.Id,
            Selected_answer__c: answer.Id
        };
        // eslint-disable-next-line no-console
        console.log("newanswerresult:"+JSON.stringify(newanswerresult) );

        testr.Answer_results__r.value.push(newanswerresult);
        // eslint-disable-next-line no-console
        console.log("newanswerresults:"+JSON.stringify(testr.Answer_results__r) );
        
    }
}
