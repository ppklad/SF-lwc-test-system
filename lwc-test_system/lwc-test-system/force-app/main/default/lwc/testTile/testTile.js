import { LightningElement, api } from 'lwc';
import tResources from '@salesforce/resourceUrl/lwc_test';
export default class TestTile extends LightningElement {
	@api test;
	appResources = {
		testSilhouette: tResources +'/img/cool-logo-mini.png',
	};
	handleOpenRecordClick() {
		const selectEvent = new CustomEvent('testview', {
			detail: this.test.Id
		});
		this.dispatchEvent(selectEvent);
	}
}