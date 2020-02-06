public class KryterionTC_Controller {
    
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestions(String testId){
      system.debug('>>>'+testId);
      List<Question__c> lstQ = [
        SELECT Id, 
          Number__c, 
          Name, 
          Answer_option__c, 
          Question_body__c,
          Comments__c, 
            (Select 
              ID,Name,
              Is__c
               ,Full_body_answer__c 
              FROM Answers__r 
            ORDER BY Name) 
        FROM Question__c 
        WHERE Test__c=:testId 
        ORDER BY Number__c];
        
      return lstQ;
    }
    
    @AuraEnabled(cacheable=true)
    public static Test_result__c getTestResults(String testId){
      Test_result__c tr;
        
        List<Test_result__c> ltr = [
          SELECT 	Id, 
          			Name, 
          			Date__c, 
          			Elapsed_time__c, 
          			Status__c, 
          	( 	SELECT 	Id,
          				Name,
          				Question__c,
          				Selected_answer__c 
          		FROM 
             		Answer_results__r 
             	ORDER BY 
             		Name
            ) 
          FROM Test_result__c 
          WHERE 
          		Status__c in ('Created','Started' )
          		AND Test__c=:testId  
          Limit 1];
        
        system.debug('queried:'+ltr);
        
        
        if(ltr.isEmpty()){
            tr = new Test_result__c();
            tr.Date__c = system.today();
            tr.Status__c = 'Created';
            tr.Test__c = testId;
            tr.Elapsed_time__c = 0;
            tr.Name = 'tstrslt';
           insert tr;
            system.debug('created:'+tr);
        }  else{
            tr = ltr[0];
        }
        system.debug('tr:'+tr);
      return tr;
    }
    
    @AuraEnabled(cacheable=true)
    public static Test__c getTestObj(String testId){
      Test__c t = [SELECT Id, Topic__c, Name, Full_name__c FROM Test__c WHERE Id=:testId ];
      System.debug('>>> getTestObj'+t);  
      return t;
    }
    
    //unuseble
    @AuraEnabled(cacheable=true)
    public static List<Answer__c> getAnswers(String testId){
      
      List<Question__c> lstQ = getQuestions(testId);  
      List<Answer__c> lstA = [SELECT Id, Name, Is__c, Question__c  FROM Answer__c WHERE Question__c in :lstQ ];
        
      return lstA;
    }
    
    @AuraEnabled(cacheable=true)
    public static String getTestId(String testId){
      System.debug('>>>'+testId); 
      Test_result__c t = [SELECT Id, Test__c  FROM Test_result__c WHERE Id = :testId ];
      System.debug('>>>'+t.Test__c);  
      return t.Test__c;
    }


}