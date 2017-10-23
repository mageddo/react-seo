import React, { Component } from 'react';
import Router, {Link} from './router/Router.js';
import 'bootstrap/dist/css/bootstrap.css';

import Student, {StudentDetails} from './page/Student.js';
import School from './page/School.js';
import Articles, {Article} from './page/Article.js';

class App extends Component {

	constructor(){
		super()
		this.state = {
			page: 'Loading...'
		}
		Router.register(this, {
			'^/page/students$': (state) => {
				this.setState({page: <Student />})
			},
			'^/page/schools$': (state) => {
				this.setState({page: <School />})
			},
			'StudentDetails': (data) => {
				this.setState({page: <StudentDetails student={data} />})
			},
			'^/page/posts$': (data) => {
				this.setState({page: <Articles />})
			},
			'^/page/posts/(\\d+)$': (data) => {
				this.setState({page: <Article id={data.pathVar[0]} />})
			}
		});
		console.debug('app=constructor');
	}

	/**
	 * Router try to invoke the right handler then call this method to reponse a feedback
	 */ 
	load(state, loaded){
		console.debug('m=App.load, state=%o, loaded=%s', state, loaded);
	}

	componentDidMount(){
		console.debug('app=componentDidMount, state=%o', window.history.state);
		Router.start();
	}

	loadPage(page){
		this.setState({page: page})
	}

	render() {
		return (
			<div className="" style={{marginTop: 60}}>
				<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" href="/" >React SEO</Link>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className="active"><Link href="/page/students" >Students</Link></li>
							<li><Link href="/page/schools" >Schools</Link></li>
							<li><Link href="/page/posts" >Posts</Link></li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="container">{this.state.page}</div>
		</div>
		);
	}
}

export default App;
