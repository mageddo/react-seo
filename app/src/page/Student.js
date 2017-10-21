import React, { Component } from "react"

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
						return <li key={k} >{v.name}</li>
					})
			}</ul>
		)
	}

}
