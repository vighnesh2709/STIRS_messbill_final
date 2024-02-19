const express=require("express");
const {google}=require("googleapis");
const app=express();

const clientEmail="mess-bill@mess-bill-412613.iam.gserviceaccount.com";
const privateKey="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtEz6DUfkDNEgB\nQqdKfPhBhLBuQUWF51jSGPB56dFHSgBksx6rg1yWlsu/KfLOLYXpBNQH77As0wB2\nj4OjdFlo0eq9DHWdKIltx8U0DAwtBxI4pCISo1cU3r+aONdMN0wVUJV40JaX5f/c\nxgKjAOt8X0TeUPhnsuGl0gzCCLXONfL3lcSAAlvEVn3l1pi3ICxGXnf0cm9sr7XD\nj6Sx/qNcajEafMR/whWFXBPifALtjVHbf6Rk77z0niEJ+jp07o7rWQLcV3BUqLtK\niC5SVS3hANk9RJ5YBCT+ANUrNQP3Y6cd4+6/FbTKnHhKw4Ek46hih4YA6EzB2d9m\nGVNHdazxAgMBAAECggEABteDqV/Qcvi6XvhiUh7CFp729YjVhX9ZgsazHPKqEAIk\nJVbyX6/b9WUFLWusWkuw5z8GXcDzKzZ1JnqyZsAG986Sk8IeFSYg1qrmyBGw2ofU\nx9HvOeLkoqHSm7djBXOLKa2LlyDRzzPrqy/Vs1lqNbqzZ4F2bG0FIA+/at06yKnH\nKYe7Pxz50T6JeZ8FKHdSSdlpk82XoA30zDz3SZ1qVoRkQ2z9XrESLKZ3JoAImuyh\nCEQiCLBeSSkSRIWULRhlO+s36wrpqz/YT9awXT8KduPBjaIgNffOw0TterEmk66J\nT2AnXeyMZxik70oGNDCjUCRVGC5L/Y4jpyQ7iRWplQKBgQDWzAWyjpFljjPovboA\nXNjK8zKJbtnq2AEI71jpsu+shsavd+hD/64S3yYAv1Z3MYsR6PGCfCeWksnamRoX\nWlPdbhzXPDltVWqL3cPqu/ZIp66Z/GaQlwg8sVkHTk6LhsVr+F8VuTmW2BlWczwS\n0t0T5xW7ai8Vf1pNtf9GaO0SRQKBgQDORmaqLhcsF53BlQ24itj0wwhqaYQevUlV\nCf3Pw4c5cPM+2wCGXJwwIX3O3GDZFaJB1dVr0HvFGQrzWsgB1gutoQ86AG1jGfhx\nHg/cVYiyfYFWT/4onynVK+ejNpXDVQNqnDjDLXFd1yLo7qFxtVLjW1cv8en85oo4\naEBSpj1wvQKBgQCWkI8R2dPbfzGt3IhsRqkEojLzmUuRzfXzwGrv7ikJI7RUPVYH\njEsGGXu3HGhMxuK4HDRmhgbuClkKLTXX1s5gshXvXdzXYf98qWfyu+zogvnmIMH4\napYwjRReBasTLNZoV8K3JI5UyYgBTGd4vmyPzfUy2TzF8e5n+MJHJbfAjQKBgQCL\nnwuO1XPJ3JJjnciTySfhRMJFhPZw+B7S+Nhb8TVupA2B1iscx0LRMVo+0tybFBGo\nDl1PhObCGplW73PCCmgNNp9f2zovgjywFHEX6q2EY39QNQUL6fAe4oD/8MqeVMTj\nPKsPMYsywZRXpm6Q0PMyAXmacly3WjTkyWwAhZXA4QKBgAhSm731+kysiQHPM8UO\n/4A/bTN3UDe0o/2GkSLjFtKvNhwQbzrr8skPr3PgA7s9WBQOHeqdighAR7dKRDFI\nHbCz3JlOo4xYYyjR+opA8QVk5zj3IbQSnClZhAsmsuIdeJhhxzV+Skels5tBjoka\np/2ey5HW9+vIoYsZ1hME/Bv4\n-----END PRIVATE KEY-----\n"
const spreadsheetId="1pdRFVOPFvkydDxSPw7tLYhLU5CrH6m8zu-W0uQZ4T_8";

app.get("/",async(req,res)=>{ 
    const auth=new google.auth.GoogleAuth({
    credentials:{
        client_email: clientEmail,
        private_key: privateKey
    },
    scopes:["https://www.googleapis.com/auth/spreadsheets"]
});

const client=await auth.getClient();
const sheet=google.sheets({version:"v4",auth});


    const response=await sheet.spreadsheets.values.get({
        spreadsheetId,
        range: "sheet1!A1:Z1000"
    });
    const value =response.data.values;
    res.send(value[1][3]);
})
   
app.listen(3020);