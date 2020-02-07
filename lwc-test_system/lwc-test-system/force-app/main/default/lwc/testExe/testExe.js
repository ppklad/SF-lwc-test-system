import { LightningElement, track, wire, api } from 'lwc';
import getQuestions from '@salesforce/apex/KryterionTC_Controller.getQuestions';
import getTestObj from '@salesforce/apex/KryterionTC_Controller.getTestObj';
import getTestId from '@salesforce/apex/KryterionTC_Controller.getTestId';

export default class TestExe extends LightningElement {
    @track error;
    test;
    testr;
    @track showrightanswer;
    @track data;
    @track question;
    @track progress;


    @api recordId;


    @wire(getTestId, {testId: '$recordId'})
    wiredTestId({ error, data }){
        if (data) {
            this.testId = data.Test__c;
            this.testr = data;
            this.error = undefined;
            // eslint-disable-next-line no-console
            // console.log("ok:"+JSON.stringify(data) );
        } else if (error) {
            this.error = error;
            this.testId = undefined;
            // eslint-disable-next-line no-console
            // console.log("we have errors:" + JSON.stringify(error));
        }
    }

    @wire(getTestObj, {testId: '$testId'}) 
    wiredTest({ error, data }){
        if (data) {
            this.test = data;
            this.error = undefined;
            // eslint-disable-next-line no-console
            //  console.log("ok:"+JSON.stringify(data) );
        } else if (error) {
            this.error = error;
            this.test = undefined;
            // eslint-disable-next-line no-console
            // console.log("we have errors:" + JSON.stringify(error));
        }
    }

    @wire(getQuestions, {testId: '$testId'})
    wiredQuestions({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
            this.questionIndex = 0;
            this.navigationHelper();
            // this.question = data[this.questionIndex];
            // eslint-disable-next-line no-console
            //  console.log("ok:"+JSON.stringify(data) );
        } else if (error) {
            this.error = error;
            this.data = undefined;
            // eslint-disable-next-line no-console
            // console.log("we have errors:" + JSON.stringify(error));
        }
    }


    //
    //Buttons
    //
    handleButtonNextClick(){
        this.questionIndex++;
        this.navigationHelper();
    }
    handleButtonPreviousClick(){
        this.questionIndex--;
        this.navigationHelper();
    }
    handleCheckClick(){
        this.showrightanswer = true;
    }
    
    
    
    //
    //Helpers
    //    
    navigationHelper(){
        this.showrightanswer = false;
        this.question = this.data[this.questionIndex];
        // eslint-disable-next-line no-console
        // console.log("Answers__r :" + JSON.stringify(this.question.Answers__r));
        //this.progress = JSON.stringify((this.questionIndex+1) / this.data.length * 100);

    }
}