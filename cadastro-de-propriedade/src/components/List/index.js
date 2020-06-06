import React, { Component } from 'react';

import NavBar from '../NavBar';
import './styles.css'

class List extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	propriedades: []
	  };
	  this.loadPropriedades = this.loadPropriedades.bind(this);
	}

	async loadPropriedades() {
		let response = await fetch('http://localhost:3001/propriedades');
		const propriedades = await response.json();
		this.setState({ propriedades: propriedades });
		console.log(propriedades);
	}

	componentDidMount() {
		this.loadPropriedades();
	}


	render() {
		return(
			<>
				<NavBar />
				<button><a href="/create">Incluir propriedade</a></button>
				{this.state.propriedades.map(propriedade => (
					<div 
						className="content"
						key={propriedade.id}>
						<div className="linhas">	
							<p>Nome: </p>
							<p>{propriedade.nome}</p>
						</div>
						<div className="linhas">	
							<p>Espécie: </p>
							<p>{propriedade.especie}</p>
						</div>
						<div className="linhas">	
							<p>Cultivares: </p>
							<p>{propriedade.cultivar}</p>
						</div>
						<div className="linhas">	
							<p>Area: </p>
							<p>{propriedade.area}</p>
						</div>
						<div className="linhas">	
							<p>Unidade: </p>
							<p>{propriedade.unidade}</p>
						</div>
					</div>
				))}
			</>
		);
	}
}

export default List;