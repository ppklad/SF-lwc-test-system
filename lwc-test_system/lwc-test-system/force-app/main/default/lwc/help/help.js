import { LightningElement , api} from 'lwc';

export default class Help extends LightningElement {
    @api comments;
    // @track arr_comments


    // connectedCallback(){
    //     // eslint-disable-next-line no-useless-escape
    //     this.arr_comments = this.comments.match("((http|https):\/\/)?(www.)?([a-z0-9-]+\.)+[a-z]{2,6}");
    //     // eslint-disable-next-line no-console
    //     console.log("вот что нашлось"+JSON.stringify(this.arr_comments));
    // }
}