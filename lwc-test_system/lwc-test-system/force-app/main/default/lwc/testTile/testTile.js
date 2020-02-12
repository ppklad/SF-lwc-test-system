import { LightningElement, api, track } from 'lwc';


import tResources from '@salesforce/resourceUrl/lwc_test';
export default class TestTile extends LightningElement {
	@api test;
	@track testrId;

	appResources = {
		testSilhouette: tResources +'/img/cool-logo-mini.png',
	};
	handleOpenRecordClick() {
		const selectEvent = new CustomEvent('testview', {
			detail: this.test.Id
		});
		this.dispatchEvent(selectEvent);
	}

	handleTileClick(){
		// eslint-disable-next-line no-console
		console.log(">>> event.testischoosen started:");
		try {
			this.dispatchEvent(new CustomEvent('testischoosen', { detail: {testId:this.test.Id, testName:this.test.Name} }));
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
		
	}
	
}