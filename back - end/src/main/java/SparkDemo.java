import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import static spark.Spark.*;

class PaymentDto{
    String toUserName;  //to
    String userName;    //from in paymentCollectin || username in userCollection
    String payment;     //amount
    String type;        //type
    String note;       //note
    String password;    //password

}


public class SparkDemo{

    public static void main(String[] args) {
        port(1234);
        Gson gson = new Gson();

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        // get reference to database
        MongoDatabase myDatabase = mongoClient.getDatabase("FinalDatabase");
        // get reference to collection
        MongoCollection<Document> paymentCollection= myDatabase.getCollection("PaymentCollection");
        MongoCollection<Document> usersCollection = myDatabase.getCollection("UserCollection");

        get("/hello", (req, res) -> "asd");

        post("/submitPayment", (req, res) -> {
            String body = req.body();
            PaymentDto paymentDto = gson.fromJson(body, PaymentDto.class);


            Document doc = new Document("toUserName", paymentDto.toUserName)
                    .append("userName", paymentDto.userName)
                    .append("payment", paymentDto.payment)
                    .append("type", paymentDto.type)
                    .append("note", paymentDto.note);

            paymentCollection.insertOne(doc);


            System.out.println(body);
            return "Submitted Payment";
        });



        get("/getPayments", (req, res) -> {
            List<Document> docs = paymentCollection.find().into(new ArrayList<Document>());
            return gson.toJson(docs);

        });
    }
}