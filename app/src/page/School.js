import React, { Component } from "react"

export default class School extends Component {

	constructor(){
		super();
		this.state = {items:[]}
		console.debug('school=constructor');
	}

	componentDidMount(){
		fetch(`http://127.0.0.1:8181/schools`)
		.then(result => result.json())
		.then(items => this.setState({items: items}))
		console.debug('student=componentDidMount');
	}

	render(){
		return (
			<ul>{
				this.state.items.map((v, k) => {
					return <li key={k} >{v.name}</li>
				})
			}</ul>
		)
	}

}
