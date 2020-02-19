import { LightningElement, track, wire, api } from 'lwc';
import getQuestions from '@salesforce/apex/KryterionTC_Controller.getQuestions';
import getTestObj from '@salesforce/apex/KryterionTC_Controller.getTestObj';
import getTestId from '@salesforce/apex/KryterionTC_Controller.getTestId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import upsertTestr from '@salesforce/apex/KryterionTC_Controller.upsertTestAnswers';
// import TESTA_OBJECT from '@salesforce/schema/Test_result__c';
import { updateRecord } from 'lightning/uiRecordApi';

export default class TestExe extends LightningElement {
    @api recordid;
    
    @track error;   
    @track showrightanswer=false;
    @track data;
    @track question;
    @track answer;

    progress;
    test;
    testr;
    localmode = true;
    // progress_ring_class = "slds-progress-ring slds-progress-ring_large";

    @wire(getTestId, {testId: '$recordid'})
    wiredTestId({ error, data }){
        if (data) {
            this.testId = data.Test__c;
            this.testr = JSON.parse(JSON.stringify(data));
            this.error = undefined;
        } else if(this.localmode){
            this.testId = "a003X0000142XNWQA2";
            this.testr = {"Id":"a033X00001JoIMnQAN","Status__c":"Started","Test__c":"a003X0000142XNWQA2","Name":"tt"};
            this.error = undefined;
        }else if (error) {
            this.error = error;
            this.testId = undefined;
        }
    }

    @wire(getTestObj, {testId: '$testId'}) 
    wiredTest({ error, data }){
        if (data) {
            this.test = data;
            this.error = undefined;
        } else if(this.localmode){
            this.test = {"Id":"a003X0000142XNWQA2","Topic__c":"Administrator","Name":"tt","Full_name__c":"ttt"};
            this.error = undefined;
        }else if (error) {
            this.error = error;
            this.test = undefined;
        }
    }

    @wire(getQuestions, {testId: '$testId'})
    wiredQuestions({ error, data }) {
        if (data) {
            this.data = JSON.parse(JSON.stringify(data));
            this.error = undefined;
            this.questionIndex = 0;
            this.navigationHelper();
        } else if(this.localmode){
            this.data = [{"Id":"a013X00002RYUItQAP","Number__c":1,"Name":"q1","Answer_option__c":"Radiobutton","Question_body__c":"Question bodyQuestion bodyQuestion bodyQuestion bodyQuestion body","Comments__c":"Comments !!!","Answers__r":[{"Question__c":"a013X00002RYUItQAP","Id":"a023X00001pFRewQAG","Name":"A.","Is__c":true,"Full_body_answer__c":"A Full body answerFull body answerFull body answer"},{"Question__c":"a013X00002RYUItQAP","Id":"a023X00001pFRf1QAG","Name":"B.","Is__c":false,"Full_body_answer__c":"B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer"}]},{"Id":"a013X00002RYUJ3QAP","Number__c":2,"Name":"q2","Answer_option__c":"Checkbox","Question_body__c":"Question body Question body Question body Question body Question body Question body Question body Question body","Comments__c":"CommentsCommentsCommentsCommentsComments","Answers__r":[{"Question__c":"a013X00002RYUJ3QAP","Id":"a023X00001pFRf6QAG","Name":"A.","Is__c":true,"Full_body_answer__c":"B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer"},{"Question__c":"a013X00002RYUJ3QAP","Id":"a023X00001pFRfBQAW","Name":"B.","Is__c":true,"Full_body_answer__c":"B Full body answer B Full body answer B Full body answer B Full body answer B Full body answer"},{"Question__c":"a013X00002RYUJ3QAP","Id":"a023X00001pFRexQAG","Name":"C.","Is__c":false,"Full_body_answer__c":"C Full body answer B Full body answer B Full body answer B Full body answer B Full body answer"}]}];
            this.error = undefined;
            this.questionIndex = 0;
            this.navigationHelper();
        }else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //
    //Events
    //
    handleAnswerEvent(event){

        let cur_answer;  
        let an;

        for(an of this.question.Answers__r){
            if(an.Id===event.detail){
                cur_answer = an;
            }
        }
        this.addOrDelAnswerToAnswersResults(cur_answer);
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
        this.showrightanswer = !this.showrightanswer ;
    }
    handleButtonFinishClick(){
        // eslint-disable-next-line no-console
        console.log(">>> fin:"+JSON.stringify(this.testr.Answer_results__r));
    }
    handleSliderChange(event){
        this.questionIndex = event.target.value;
        this.navigationHelper();
    }
    
    
    
    //
    //Helpers
    //    
    navigationHelper(){
        this.showrightanswer = false;
        this.question = this.data[this.questionIndex];
        this.progress = this.questionIndex/this.data.length * 100;
    }

    addOrDelAnswerToAnswersResults(aobj){
        //при первом проходе вложенного обьекта результатов теста не будет, поэтому проверяем и создаем если нужно
        if(!this.testr.Answer_results__r){
            this.testr.Answer_results__r = [];
        }

        //делаем массив из результатов поиска id ответа в обьекте с ответами, в зависимости от результатов поиска
        //либо добавляем элемент, либо удаляем найденные
        let arr = this.findAnswerIndexsInResult(aobj.Id);

        if(arr.length===0){
        // добавляем в обьект новые выбранные ответы, если тыкаем первый раз
            try{
            let newanswerresult = {
                Test_result__c: this.testr.Id,
                Name: aobj.Name,
                Question__c:  this.question.Id,
                Selected_answer__c:  aobj.Id
            };
           
            this.testr.Answer_results__r.push(newanswerresult);
            // this.upsertAnswerRes(newanswerresult);

            //обьет question передается в дочерний компонент, поэтому дописываем туда что ответ выбран, для корректного
            //отображения галочки при переходе между вопросами
            let elem;
            for(elem of this.question.Answers__r){
                if(elem.Id===aobj.Id){
                    elem.answerChoosen = true;
                }
            }
            }catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }else { // если клик был второй раз (четный) тогда надо удалить из обьекта запись, т.к. ее выбор отменили
            try{
                let val;
                for (val of arr) {
                    this.testr.Answer_results__r.splice(val,1);
                }

                //обьет question передается в дочерний компонент, поэтому дописываем туда что ответ НЕ выбран, для корректного
                //отображения галочки при переходе между вопросами
                let elem;
                for(elem of this.question.Answers__r){
                    if(elem.Id===aobj.Id){
                        elem.answerChoosen = false;
                    }
                }
            }
            catch(e){
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }
        
    }

    findAnswerIndexsInResult(aid){
        //поиск по Id ответа в обьекте с результами
        let arr = [];
        let elemnet_index = this.testr.Answer_results__r.length-1;
        while (elemnet_index >= 0) {

            let element = this.testr.Answer_results__r[elemnet_index];

            if(element.Selected_answer__c === aid){
                arr.push(elemnet_index);
            }
            elemnet_index --;   
        }

        return arr;
    }

    upsertAnswerRes(a){
        updateRecord(a)
        // eslint-disable-next-line no-unused-vars
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Is Updated',
                    variant: 'sucess',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error on data save',
                    message: error.message.body,
                    variant: 'error',
                }),
            );
        });
    }

}