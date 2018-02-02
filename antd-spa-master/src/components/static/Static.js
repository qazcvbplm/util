import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';

const IP='http://tzhop.free.ngrok.cc/';
const FileIP='http://www.wojush.com/';
const Static = {
   ImageIP:FileIP,
   IP:IP+'/frame/',
   FileIP:FileIP+'/frame/',
   history:createHistory(),
   school:null,
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
   }
};
export default Static;
