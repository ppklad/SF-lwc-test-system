public class sendEmail {
    public String subject { get; set; }
    public String body { get; set; }
    public String userEmail { get; set; }
    public String[] userEmailArray { get; set; }


    public PageReference send() {
        // Define the email
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 
        body = 'my contacts';

        userEmailArray.add(userEmail);

        // Sets the paramaters of the email
        email.setSubject( subject );
        email.setToAddresses( userEmailArray );
        email.setPlainTextBody( body );


        // Sends the email
        Messaging.SendEmailResult [] r = 
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});   
		
        return null;
    }
}