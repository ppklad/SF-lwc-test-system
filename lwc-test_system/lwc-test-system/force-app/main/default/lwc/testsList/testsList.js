import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import { LightningElement, track, wire } from 'lwc';
/** TestController.searchTests(searchTerm) Apex method */
import searchTests from '@salesforce/apex/TestController.searchTests';
export default class TestListNav extends NavigationMixin(LightningElement) {
	@track searchTerm = '';
    
    @track tests;
    @wire(CurrentPageReference) pageRef;
    @wire(searchTests, {searchTerm: '$searchTerm'})
    loadTests(result) {
        this.tests = result;
        if (result.data) {
            fireEvent(this.pageRef, 'testListUpdate', result.data);
        }
    }

	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
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