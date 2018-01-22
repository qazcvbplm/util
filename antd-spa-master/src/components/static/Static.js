import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';

const Static = {
   IP:'http://localhost/frame/',
   history:createHistory(),
   request:function(url,callback){
         $.ajax({
         	url:this.IP+url,
         	method:'post',
         	dataType:'json',
         	success:function(res){
                  callback(res);
         	}
         })
   }
};
export default Static;
