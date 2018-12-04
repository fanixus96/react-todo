import moment from 'moment';

class Deserializer {
	

    static async getTodos() {
	    var response = await fetch('https://tower-rails.herokuapp.com/task_lists/1/tasks', { 
	        method: 'Get',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/json',
	          'uid': localStorage.getItem("uid"), 
	          'client': localStorage.getItem("client"), 
	          'Access-Token': localStorage.getItem("accessToken") 
	        },
	    })
	    return response;
  	}

  	static async asyncTodos() {
  		var response = await this.getTodos();
  		console.log(response)
  		localStorage.setItem("uid", response.headers.get('Uid'));
	    localStorage.setItem("client", response.headers.get('Client'));
  		var tablica = await response.json();
  		var tablica1 = tablica.map(function(x) {
  			x.happens_at = moment(x.happens_at).format('YYYY-MM-DD');
  			x.title = x.content;
	        x.start = x.happens_at;
	        console.log(x.happens_at)
	        delete x.content
	        delete x._proto_
	        delete x.created_at
	        delete x.updated_at
	        delete x.list_position;
	        delete x.task_list_id;
	        return x

  		})	  
  		return tablica1;
  	}

}
export default Deserializer;