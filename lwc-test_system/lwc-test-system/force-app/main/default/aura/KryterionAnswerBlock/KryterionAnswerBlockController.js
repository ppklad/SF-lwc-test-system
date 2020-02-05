({
  AddCheckedAnswer: function(component, event, helper) {
    var Test_result = component.get("v.Test_result");
    var Answer_results = component.get("v.Answer_results");
    var questions = component.get("v.questions");
    var question = component.get("v.question");
    var answer = component.get("v.answer");
    //console.log("cheked "+ JSON.stringify(Answer_results));

    var test_answer = {
      Name: answer.Name,
      Question__c: question,
      Selected_answer__c: answer
    };
    var cheked = component.find("checkbox").get("v.value");

    var index = 0;
    //console.log("cheked index 1 :" + index);
    var a = {};
    var i=0;  
    //console.log(">>> start search " + Answer_results.length);
    //console.log("cheked value " + JSON.stringify(cheked));
    if (Answer_results.length > 0) {
      //console.log("Answer_results.length > 0");  
      i=0;  
      for (i = 0; i < Answer_results.length; i++) {
         //console.log("in for loop "+i); 
         a = Answer_results[i];
         //console.log(">>>"+ JSON.stringify(a) +" || "+JSON.stringify(test_answer));
         if(JSON.stringify(a) === JSON.stringify(test_answer)){
             index = i;
             //console.log("nice! index"+i);
         };
        ;
      }
    }

    //index = Answer_results.indexOf(test_answer) ;
    //console.log("cheked value " + JSON.stringify(cheked));
    if (cheked == true) {
      //console.log("cheked index 2:" + index);
      //console.log(">>> test_answer" + JSON.stringify(test_answer));
      //console.log(">>> Answer_results" + JSON.stringify(Answer_results));
        console.log("Answer id right?:" + answer.Is__c);
      Answer_results.push(test_answer);
    } else {
      Answer_results.splice(index,1);  
      //console.log("cheked index 3:" + index);
    }
  },
    
    
    onRadio: function(component, event, helper){
        var answer = component.get("v.answer");
        var Answer_results = component.get("v.Answer_results");
        var question = component.get("v.question");    
        var test_answer = {
          Name: answer.Name,
          Question__c: question,
          Selected_answer__c: answer
        };
		console.log("Answer id right?:" + answer.Is__c); 
		Answer_results.push(test_answer);
    	//var selected = evt.getSource().get("v.label");
		//resultCmp = cmp.find("radioResult");
		//resultCmp.set("v.value", selected);
	 },
});