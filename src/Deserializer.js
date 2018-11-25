class Deserializer {


	constructor(props) {
  	}	

    static async getTodos() {
	    var response = await fetch('https://tower-rails.herokuapp.com/task_lists', { 
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
  		localStorage.setItem("uid", response.headers.get('Uid'));
	    localStorage.setItem("client", response.headers.get('Client'));
  		var tablica = await response.json();
  		 	  tablica[0].title = tablica[0].name;
	          tablica[0].start = tablica[0].created_at;
	          delete tablica[0].name
	          delete tablica[0].created_at
	          delete tablica[0]._proto_
	          delete tablica[0].updated_at
  		return tablica;
  		console.log(tablica)
  	}

}
export default Deserializer;