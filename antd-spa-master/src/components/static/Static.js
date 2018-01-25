import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';

const Static = {
   IP:'http://localhost/frame/',
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
