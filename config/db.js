if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://lleria:00611202087176789789luk@blogappcluster.okfybu5.mongodb.net/?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost:27017/"}
}