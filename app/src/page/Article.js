import React, { Component } from "react"
import { Link } from "../router/Router.js"

export default class Articles extends Component {

	constructor(){
		super();
		this.state = {items:[]}
		console.debug('articles=constructor');
	}

	componentDidMount(){
		fetch(`http://jsonplaceholder.typicode.com/posts`)
		.then(result => result.json())
		.then(items => this.setState({items: items}))
		console.debug('articles=componentDidMount');
	}

	render(){
		return (
			<ul>{
				this.state.items.map((v, k) => {
					return <li key={k} ><Link href={"/article/" + v.id} data={{id: v.id}} page="Article">{v.title}</Link></li>
				})
			}</ul>
		)
	}

}

export class Article extends Component {

	constructor(props){
		super();
		this.state = {article: {}}
		console.debug('article=constructor');
	}

	componentDidMount(){
		fetch(`http://jsonplaceholder.typicode.com/posts/` + this.props.id)
		.then(result => result.json())
		.then(items => this.setState({article: items}))
		console.debug('article=componentDidMount');
	}

	render(){
		return (
			<div>
				<h1>{this.state.article.title}</h1>
				<p>{this.state.article.body}</p>
			</div>
		)
	}

}