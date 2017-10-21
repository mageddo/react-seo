class Router {

	static instance;

	constructor() {
		this.state = {}
		window.onpopstate = function(e){
			var st = e.state;
			console.debug('m=onpopstate, state=%o, e=%o', st, e)
			if (st !== null) {
					Router.getInstance().doLoad(st);
			} else {
				console.info('No state');
			}
		}
	}

	static getInstance(){
		if (!Router.instance) {
			Router.instance = new Router()
		}
		return Router.instance
	}

	static load(e, page){
		e.preventDefault();
		history.pushState(state, state.title, state.path);
		Router.getInstance().doLoad({
			page: page,
			path: e.currentTarget.getAttribute('href'),
			title: e.currentTarget.getAttribute('title')
		})
	}

	static doLoad(state){

		// currently browsers does not consider the pushState title property
		// so we need to set it using document
		document.title = state.title;

		Router.getInstance().setState(state)
	}

}

class Link extends React.Component {

	constructor(props){
		super()
		this.props = props;
	}

	render(){
		return <a data-title={this.props.title} className="load-link" onClick={(e) => Router.load(e, this.props.page)} {...this.props}>{this.props.children}</a>
	}
};