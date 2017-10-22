import React, { Component } from 'react';
import Router, {Link} from './router/Router.js';
import 'bootstrap/dist/css/bootstrap.css';

import Student from './page/Student.js';
import School from './page/School.js';

class App extends Component {

	constructor(){
		super()
		this.state = {
			page: 'Loading...'
		}
		Router.register(this);
		console.debug('app=constructor');
	}

	load(state){
		console.debug('m=App.load, state=%o', state);
		this.setState({page: state.page})
	}

	componentDidMount(){
		Router.pushAndLoad({
			page: <Student />,
			path: "/students"
		});
		console.debug('app=componentDidMount');
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
						<Link className="navbar-brand" href="/" page={<Student />} >React SEO</Link>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className="active"><Link href="/students" page={<Student />}>Students</Link></li>
							<li><Link href="/schools" page={<School />}>Schools</Link></li>
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
