import moment from 'moment';

class Deserializer {

	static async fetchPattern(link,method,body) {

		var response = await fetch(link, { 
	        method: method,
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/json',
	          'uid': localStorage.getItem("uid"), 
	          'client': localStorage.getItem("client"), 
	          'Access-Token': localStorage.getItem("accessToken") 
	        },
	        body: JSON.stringify(body)
	    })
	    var header = await response;
	    localStorage.setItem("uid", header.headers.get('Uid'));
	    localStorage.setItem("client", header.headers.get('Client'));
	    if (header.headers.get('Access-Token') !== null && header.headers.get('Access-Token') !== '') {
	    	localStorage.setItem("accessToken", header.headers.get('Access-Token'));
	    }
	     
	    if (await response.status === 401) {
	    	localStorage.clear();
	    	window.location.reload();
	    }

	    return response;

	}

	static async userList() {
		return await this.fetchPattern('https://tower-rails.herokuapp.com/task_lists', 'GET')
	}

	static async userListId() {
		var response = await this.userList();
		var userList = await response.json();
		console.log(userList);
		if (userList.length < 1) {
			this.createLists();
			window.location.reload();
		} else {
			return userList;
		}
		
	}

	static async createLists() {
		return await this.fetchPattern('https://tower-rails.herokuapp.com/task_lists','POST',{ task_list: { name: "test" }})
	}
	

    static async getTodos() {
    	var list = await this.userListId();
    	console.log(list)
	    var id = list[0].id;
	    return await this.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+id+'/tasks','GET')
  	}

  	static async asyncTodos() {
  		var response = await this.getTodos();
  		if (response.status === 404) {
  			console.log(response)
  		} else {
  		console.log(response)
  		localStorage.setItem("uid", response.headers.get('Uid'));
	    localStorage.setItem("client", response.headers.get('Client'));
  		var todos = await response.json();
  		console.log(todos)
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