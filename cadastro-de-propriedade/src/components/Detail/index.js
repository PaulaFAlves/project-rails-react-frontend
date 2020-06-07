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
		if (window.confirm(`Tem certeza que deseja exluir?`)) {
			await fetch(`http://localhost:3001/propriedades/${id}`, { method: 'DELETE'});
			
		}
		window.history.back();
	}

	render() {
		return(
			<>
				<NavBar />
				<div className="detail-main">	
						<div className="content">
							<div className="linhas">	
								<span>Nome: </span>
								<span className="linhas-nome"><strong>{this.state.propriedades.nome}</strong></span>
								<hr color="#E8E8E8"/>
							</div>
							<div className="linhas">	
								<span>Espécie: </span>
								<span>{this.state.propriedades.especie}</span>
								<hr color="#E8E8E8"/>
							</div>
							<div className="linhas">	
								<span>Cultivares: </span>
								<span>{this.state.propriedades.cultivar}</span>
								<hr color="#E8E8E8"/>
							</div>
							<div className="linhas">	
								<span>Area: </span>
								<span>{this.state.propriedades.area}</span>
								<hr color="#E8E8E8"/>
							</div>
							<div className="linhas">	
								<span>Unidade: </span>
								<span>{this.state.propriedades.unidade}</span>
							</div>
						</div>		
				</div>
				<div className="button-container">
					<button className="button"><a href="/">Voltar</a></button>
					<button className="button" onClick={this.deletarPropriedade}><a href="#">Excluir</a></button>
				</div>
			</>
		);
	}
}

export default Detail;