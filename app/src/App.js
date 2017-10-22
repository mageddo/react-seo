import React, { Component } from 'react';
import Router, {Link} from './router/Router.js';
import 'bootstrap/dist/css/bootstrap.css';

import Student, {StudentDetails} from './page/Student.js';
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
		Router.invoke(state, {
			'Student': (data) => {
				this.setState({page: <Student />})
			},
			'School': (data) => {
				this.setState({page: <School />})
			},
			'StudentDetails': (data) => {
				this.setState({page: <StudentDetails student={data} />})
			}
		});
	}

	componentDidMount(){
		console.debug('app=componentDidMount, state=%o', window.history.state);
		if(window.history.state !== null){
			Router.doLoad(window.history.state);
		}else {
			Router.doLoad({
				page: "Student",
				path: "/students"
			});
		}
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
						<Link className="navbar-brand" href="/" page="Student" >React SEO</Link>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className="active"><Link href="/students" page="Student" >Students</Link></li>
							<li><Link href="/schools" page="School" >Schools</Link></li>
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
