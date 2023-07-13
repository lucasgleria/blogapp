if(process.env.NODE_ENV == "production"){
    console.log(process.env.DB_MAJOR)
    module.exports = {mongoURI: process.env.DB_MAJOR}
}else{
    console.log(process.env.DB_REGULAR)
    module.exports = {mongoURI: process.env.DB_REGULAR}
}