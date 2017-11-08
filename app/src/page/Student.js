import React, { Component } from "react"
import {Link} from "react-push-state"

export default class Student extends Component {

	constructor(){
		super();
		this.state = {students:[]}
		console.debug('student=constructor');
	}

	componentDidMount(){
		fetch(window.Locator.API.solve(`/students`))
		.then(result => result.json())
		.then(students => this.setState({students: students}))
		console.debug('student=componentDidMount');
	}

	render(){
		return (
			<ul>{
				this.state.students.map((v, k) => {
					return <li key={k} ><Link data={v} pushstate="false" page={<StudentDetails student={v} />} href={"/page/student/" + v.name}>{v.name}</Link></li>
				})
			}</ul>
		)
	}

}


export class StudentDetails extends Component {

	constructor(props){
		super();
		this.student = props.student;
	}

	showDetails(){
		console.info("m=showdetails");
		var x = console.info.nothing();
	}

	render(){
		return (
			<div>
				<h1 onClick={this.showDetails}>Details about: {this.student.name}</h1>
				<ul>
					<li>Age: {this.student.age}</li>
				</ul>
			</div>
		)
	}
}