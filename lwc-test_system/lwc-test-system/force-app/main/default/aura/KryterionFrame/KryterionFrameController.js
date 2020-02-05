({
  
  AddCheckedAnswer: function(component, event, helper) {
    var Test_result = component.get("v.Test_result");
    var Answer_results = component.get("v.Answer_results");
    var questions = component.get("v.questions");
    var question = component.get("v.question");
    var answer = component.get("v.answer");
    console.log("cheked " + JSON.stringify(answer));
    //Answer_results.push(["Name":]);
  },

  handleClickNext: function(component, event, helper) {
    var bEvent = component.getEvent("button");
    bEvent.setParams({
      ButtonName: "Next"
    });
    bEvent.fire();

    console.log(">>> Next> ");
  },

  handleClickBack: function(component, event, helper) {
    console.log(">>> Back ");
    var bEvent = component.getEvent("button");
    bEvent.setParams({
      ButtonName: "Back"
    });
    bEvent.fire();
  }
});