import moment from 'moment';

class Deserializer {

	static async userList() {

		 var response = await fetch('https://tower-rails.herokuapp.com/task_lists', { 
	        method: 'GET',
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

	static async userListId() {
		var response = await this.userList();
		var userList = await response.json();
		console.log(userList);
		if (userList.length < 1) {
		this.createLists();
		} else {
			return userList;
		}
		
	}

	static async createLists() {

		 var response = await fetch('https://tower-rails.herokuapp.com/task_lists', { 
	        method: 'POST',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/json',
	          'uid': localStorage.getItem("uid"), 
	          'client': localStorage.getItem("client"), 
	          'Access-Token': localStorage.getItem("accessToken") 
	        },
	        body: JSON.stringify({ task_list: { name: "test" }})
	    })
	    return response;
	}
	

    static async getTodos() {
    	var list = await this.userListId();
    	console.log(list)
	    	var id = list[0].id;
		    var response = await fetch('https://tower-rails.herokuapp.com/task_lists/'+id+'/tasks', { 
		        method: 'Get',
		        headers: {
		          'Accept': 'application/json, text/plain, */*',
		          'Content-Type': 'application/json',
		          'uid': localStorage.getItem("uid"), 
		          'client': localStorage.getItem("client"), 
		          'Access-Token': localStorage.getItem("accessToken") 
		        },
		    })
		    return response
	
  	}

  	static async asyncTodos() {
  		var response = await this.getTodos();
  		if (response.status === 404) {
  			console.log("asdasd")
  			console.log(response)
  		} else {
  		console.log(response)
  		localStorage.setItem("uid", response.headers.get('Uid'));
	    localStorage.setItem("client", response.headers.get('Client'));
  		var todos = await response.json();
  		var todosList = todos.map(function(x) {
  			x.happens_at = moment(x.happens_at).format('YYYY-MM-DD');
  			x.title = x.content;
	        x.start = x.happens_at;
	        console.log(todosList)
	        delete x.content
	        delete x._proto_
	        delete x.created_at
	        delete x.updated_at
	        delete x.list_position;
	        delete x.task_list_id;
	        return x

  		})	  
  		return todosList;
  	}
  }
}
export default Deserializer;