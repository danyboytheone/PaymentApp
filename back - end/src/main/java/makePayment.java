//import com.google.gson.Gson;
//import com.mongodb.MongoClient;
//import com.mongodb.client.MongoCollection;
//import com.mongodb.client.MongoDatabase;
//import org.bson.Document;
//
//import static spark.Spark.*;
//
//class PaymentDto{ // dto for transactions 5/8/2022
//    String toUsername;
//    String fromUsername;
//    Double amount;
//    String comment;
//}
//
//public class makePayment {
//
//    public static void main(String[] args) {
//        port(1234); // connect to browser
//        Gson gson = new Gson(); // gson obj to convert json string<->java obj
//
//        // open connection
//        MongoClient mongoClient = new MongoClient("localhost", 27017);
//        // get reference to database
//        MongoDatabase myDatabase = mongoClient.getDatabase("MyDatabase");
//        // get reference to collection
//        MongoCollection<Document> myCollection = myDatabase.getCollection("MyCollection");
//
//        /** payment endpoint - submit new payments **/
//        post("/submitPayment", (req, res) -> {
//            String body = req.body(); // returned body from const settings in front end // json string
//            PaymentDto paymentDto = gson.fromJson(body, PaymentDto.class);  // json string to java obj // json string->dto obj
//
//            // add to mongodb
//            // create new document
//            Document doc = new Document("fromUsername", paymentDto.fromUsername)
//                    .append("amount", paymentDto.amount)
//                    .append("comment", paymentDto.comment)
//                    .append("toUsername", paymentDto.toUsername);
//
//            myCollection.insertOne(doc);  // add document to collection
//
//            System.out.println(body);
//            return "Submitted Payment";
//        });
//    }
//}