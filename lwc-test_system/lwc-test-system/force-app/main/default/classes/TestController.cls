public with sharing class TestController {

    @AuraEnabled(Cacheable=true)
    public static Test__c[] getAllTests() {
        return [SELECT Id, Name, Full_name__c, Topic__C
            FROM Test__c ORDER BY Name LIMIT 50];
    }

    @AuraEnabled(Cacheable=true)
    public static Test__c[] searchTests(String searchTerm) {
        // Return all tests when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllTests();
        }
        // Prepare query paramters
        searchTerm = '%'+ searchTerm +'%';
        // Execute search query
        return [SELECT Id, Name, Full_name__c, Topic__C
            FROM Test__c WHERE Name LIKE :searchTerm ORDER BY Name LIMIT 50];
    }
    
}
