import { LightningElement, track, wire, api } from 'lwc';
import getQuestions from '@salesforce/apex/KryterionTC_Controller.getQuestions';
import getTestObj from '@salesforce/apex/KryterionTC_Controller.getTestObj';
import getTestId from '@salesforce/apex/KryterionTC_Controller.getTestId';

export default class TestExe extends LightningElement {

    // @track data;
    @track error;
    @track test;
    @track data;
    @track question;
    @track progress;


    @api recordId;


    @wire(getTestId, {testId: '$recordId'})
    wiredTestId({ error, data }){
        if (data) {
            this.testId = data;
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
            // console.log("ok:"+JSON.stringify(data) );
        } else if (error) {
            this.error = error;
            this.data = undefined;
            // eslint-disable-next-line no-console
            // console.log("we have errors:" + JSON.stringify(error));
        }
    }

    handleButtonNextClick(){
        this.questionIndex++;
        this.navigationHelper();
        // this.question = this.data[this.questionIndex];
    }
    handleButtonPreviousClick(){
        this.questionIndex--;
        this.navigationHelper();
    }

    navigationHelper(){
        this.question = this.data[this.questionIndex];
        // eslint-disable-next-line no-console
        console.log("progress :" + JSON.stringify((this.questionIndex+1) / this.data.length * 100) );
        this.progress = JSON.stringify((this.questionIndex+1) / this.data.length * 100);

    }
}