import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import TESTRESULT_OBJECT from '@salesforce/schema/Test_result__c';
import NAME_FIELD from '@salesforce/schema/Test_result__c.Name';


export default class TestInfo extends NavigationMixin(LightningElement) {
    @api recordId;
    @track accountId;
    handleStartTestClick() {
		// const selectEvent = new CustomEvent('testview', {
		// 	detail: this.recordId
		// });
        // this.dispatchEvent(selectEvent);
        // eslint-disable-next-line no-console
        console.log("v10")
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Test__c',
                relationshipApiName: 'Test_result__c',
                actionName: 'view'
            }
        });
        // this.createTestResult();
        
    }
    
    createTestResult() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: TESTRESULT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(testResult => {
                this.testResultId =testResult.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Test res created',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
        
    }
    
}