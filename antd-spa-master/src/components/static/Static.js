import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';

const IP='http://localhost/';
const FileIP='http://www.wojush.com/';
const Static = {
   ImageIP:FileIP,
   IP:IP+'/frame/',
   FileIP:FileIP+'/frame/',
   history:createHistory(),
   school:null,
   app:null,
   console:[],
   request:function(url,data,callback){
         $.ajax({
         	url:this.IP+url,
         	method:'POST',
         	dataType:'json',
            data:data,
         	success:function(res){
                  callback(res);
         	}
         })
   },
   Loading:function(){
        this.app.setState({loading:true});
   },
   hideLoading:function(){
      this.app.setState({loading:false});
   },
   socket(){
      let that=this;
       let socket = new WebSocket('ws://localhost/frame/ws/socket');
         socket.onmessage = function(e){
            that.console.push(e.data);
         };
   }
};
export default Static;
