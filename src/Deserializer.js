class Deserializer {


	constructor(props) {
  	}	

    static async getTodos() {
	    fetch('https://tower-rails.herokuapp.com/task_lists', { 
	        method: 'Get',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/json',
	          'uid': localStorage.getItem("uid"), 
	          'client': localStorage.getItem("client"), 
	          'Access-Token': localStorage.getItem("accessToken") 
	        },
	    })
  	}

  	static async asyncTodos() {
  		var tablica = await this.getTodos();
  		console.log(tablica)
  	}

}
export default Deserializer;