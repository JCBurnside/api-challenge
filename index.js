var express=require("express");
var app = express();
var http=require('http').Server(app);
// app.use(express.static(__dirname+'/Public'));
app.use(express.static(__dirname+'/Public'))
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html');
});
http.listen(project.evn.PORT||3000,()=>{
	console.log('listening on port 3000')
});
