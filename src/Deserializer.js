class Deserializer {


	constructor(props) {
  	}	

    static getTodos() {
	    fetch('https://tower-rails.herokuapp.com/task_lists', { 
	        method: 'Get',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/json',
	          'uid': localStorage.getItem("uid"), 
	          'client': localStorage.getItem("client"), 
	          'Access-Token': localStorage.getItem("accessToken") 
	        },
	    }).then(function(response){
	        localStorage.setItem("uid", response.headers.get('Uid'));
	        localStorage.setItem("client", response.headers.get('Client'));
	        response.json().then(function(json){
	          json[0].title = json[0].name;
	          json[0].start = json[0].created_at;
	          delete json[0].name
	          delete json[0].created_at
	          delete json[0]._proto_
	          var newTodos1 = [];
	          newTodos1.push(json[0])
	         return (newTodos1);
	        })
	    })
  }



}
export default Deserializer;