const express=require('express')
const app=express();
const cors=require ('cors');
const port=process.env.PORT||5000;
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://portfolio:sYEiWzlJ2LzZKcSN@cluster0.mrwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();

        const database = client.db('portfolio');
        const projectCollection=database.collection('project');
        console.log('database connected')
        
        app.get('/project',async(req,res)=>{
            const cursor=projectCollection.find({});
            const result=await cursor.toArray();
            res.json(result);
        })
        
    }
    finally{
        // client.close()
    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('hello Alok')
})

app.listen(port,()=>{
    console.log('Alok portfolio server running successfully')
})