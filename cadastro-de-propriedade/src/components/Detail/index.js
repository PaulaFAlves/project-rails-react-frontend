import React, { Component } from 'react';

import NavBar from '../NavBar';
import './styles.css'



class Detail extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	propriedades: []
	  };
	  this.loadPropriedades = this.loadPropriedades.bind(this);
	}

	async loadPropriedades() {
		const id = localStorage.getItem('id');
		let response = await fetch(`http://localhost:3001/propriedades/${id}`);
		const propriedades = await response.json();
		this.setState({ propriedades: propriedades });
	}

	componentDidMount() {
		this.loadPropriedades();
	}

	async deletarPropriedade(e) {
		e.preventDefault();
		const id = localStorage.getItem('id');
		if (window.confirm(`Are you sure you want to delete?`)) {
			await fetch(`http://localhost:3001/propriedades/${id}`, { method: 'DELETE'});
			
		}
	}



	render() {
		return(
			<>
				<NavBar />
				<div className="main">	
						<div className="content">
							<div className="linhas">	
								<p>Nome: </p>
								<p className="linhas-nome"><strong>{this.state.propriedades.nome}</strong></p>
							</div>
							<div className="linhas">	
								<p>Espécie: </p>
								<p>{this.state.propriedades.especie}</p>
							</div>
							<div className="linhas">	
								<p>Cultivares: </p>
								<p>{this.state.propriedades.cultivar}</p>
							</div>
							<div className="linhas">	
								<p>Area: </p>
								<p>{this.state.propriedades.area}</p>
							</div>
							<div className="linhas">	
								<p>Unidade: </p>
								<p>{this.state.propriedades.unidade}</p>
							</div>
						</div>		
				</div>
				<div className="button-container">
					<button className="button"><a href="/">Voltar</a></button>
					<button className="button" onClick={this.deletarPropriedade}>Excluir</button>
				</div>
			</>
		);
	}
}

export default Detail;