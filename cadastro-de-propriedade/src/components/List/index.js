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

	handlePropriedadeSelecionada(id) {
		localStorage.setItem(id, id)
	}


	render() {
		return(
			<>
				<NavBar />
				<div className="button-container">
					<button className="button"><a href="/create">Incluir propriedade</a></button>
				</div>
				<div className="main">
					{this.state.propriedades.map(propriedade => (
						<div 
							className="content"
							key={propriedade.id}>
							<div className="linhas">	
								<p><strong>
								<a 
									href='/detail'
									onClick={() => localStorage.setItem('id', propriedade.id)}>
									{propriedade.nome}
								</a></strong></p>
							</div>

						</div>
					))}
				</div>
			</>
		);
	}
}

export default List;