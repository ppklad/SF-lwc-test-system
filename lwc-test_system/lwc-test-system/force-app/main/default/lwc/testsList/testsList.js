import { NavigationMixin } from 'lightning/navigation';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/lwc_test';
import { LightningElement, track, wire } from 'lwc';
/** TestController.searchTests(searchTerm) Apex method */
import searchTests from '@salesforce/apex/TestController.searchTests';
export default class TestListNav extends NavigationMixin(LightningElement) {
	@track searchTerm = '';
	@wire(searchTests, {searchTerm: '$searchTerm'})
	tests;
	
	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
		window.clearTimeout(this.delayTimeout);
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
					// eslint-disable-next-line no-console
					this.tests.data = [
						{Id:'a003X00001403WjQAI',Name:'ADM(201) SU19', Topic__c:'Administrator'},
						{Id:'a003X0000140hjZQAQ',Name:'App Builder (SP19)',Full_name__c:'App Builder (SP19)',Topic__c:'Developer'},
						{Id:'a003X00001401z1QAA',Name:'PD1 (SU19)',Full_name__c:'Salesforce Certified Platform Developer I (SP19)',Topic__c:'Developer'},
						{Id:'a003X00001406ecQAA',Name:'PD1 (WI18)',Full_name__c:'Summer 18 and Winter 19 PD1',Topic__c:'Administrator'},
						{Id:'a003X0000140DDkQAM',Name:'PD2 (SU19) v1',Full_name__c:'Salesforce Certified Platform Developer II - Multiple Choice (SU19)',Topic__c:'Developer'},
						{Id:'a003X0000140MPrQAM',Name:'PD2 (SU19) v2',Full_name__c:'Salesforce Certified Platform Developer II - Multiple Choice (SU19)(v2)',Topic__c:'Developer'},
						{Id:'a003X0000140iw7QAA',Name:'Sharing and Visibility',Full_name__c:'Salesforce Certified Sharing and Visibility Designer',Topic__c:'Developer'},
						{Id:'a003X0000142XNWQA2',Name:'tt',Full_name__c:'ttt',Topic__c:'Administrator'}];
		}, 100);


	}
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.tests.data.length > 0);
	}
	handleTestView(event) {
		// Get test record id from testview event
		const testId = event.detail;
		// Navigate to test record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: testId,
				objectApiName: 'Test__c',
				actionName: 'view',
			},
		});
	}
}