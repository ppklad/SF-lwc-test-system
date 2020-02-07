import { LightningElement, api } from 'lwc';

export default class QuestionTile extends LightningElement {
    @api question;
    @api showrightanswer;
    @api testr;
}