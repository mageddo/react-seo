export default class Locator {

	static API =  new Locator("https://react-seo.herokuapp.com/api");
	static JSON_REPLACE_HOLDER = new Locator("//jsonplaceholder.typicode.com");

	constructor(url){
		this.url = url;
	}

	solve(path){
		return this.url + path;
	}
}