import { LightningElement, api } from 'lwc';

export default class ChartBar extends LightningElement {
    @api percentage;
    @api indicator;

    get style() {
        return `width: ${this.percentage}%`;
    }
}