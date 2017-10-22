import React, { Component } from "react"
import {Link} from "../router/Router.js"

export default class Student extends Component {

	constructor(){
		super();
		this.state = {students:[]}
		console.debug('student=constructor');
	}

	componentDidMount(){
		fetch(`http://127.0.0.1:8181/students`)
		.then(result => result.json())
		.then(students => this.setState({students: students}))
		console.debug('student=componentDidMount');
	}

	render(){
		return (
			<ul>{
				this.state.students.map((v, k) => {
					// return <li></li>
					return <li key={k} ><Link page={<StudentDetails student={v} />} href={"/student/" + v.name}>{v.name}</Link></li>
				})
			}</ul>
		)
	}

}


class StudentDetails extends Component {

	constructor(props){
		super();
		this.student = props.student;
	}

	render(){
		return (
			<div>
				<h1>Details about: {this.student.name}</h1>
				<ul>
					<li>Age: {this.student.age}</li>
				</ul>
			</div>
		)
	}
}