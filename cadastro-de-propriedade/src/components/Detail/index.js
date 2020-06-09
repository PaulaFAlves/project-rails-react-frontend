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
		let especie = await this.loadEspecies(propriedades.especie);
		especie = especie.map(especie => {
			return especie.nome;
		})
		let cultivar = await this.loadCultivares(propriedades.cultivar);
		cultivar = cultivar.map(cultivar => {
			return cultivar.nome;
		})
		this.setState({ 
			propriedades: 
			{
				nome: propriedades.nome,
				especie: especie,
				cultivar: cultivar,
				area: propriedades.area,
				unidade: propriedades.unidade,
			} 
		});
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

	async loadEspecies(especie) {
		const converteEspecie = Number(especie)
		let response = await fetch('http://localhost:3001/especies');
		const especies = await response.json();
		const resultado = especies.filter(especie => {
			return especie.id === converteEspecie
		})
		return resultado	
	}

	async loadCultivares(cultivar) {
		const converteCultivar = Number(cultivar)
		let response = await fetch('http://localhost:3001/cultivares');
		const cultivares = await response.json();
		const resultado = cultivares.filter(cultivar => {
			return cultivar.id === converteCultivar
		})
		return resultado	
	}

	render() {
		return(
			<>
				<NavBar />
				<h1 className="main-title">Detalhes da Propriedade</h1>
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
					<button className="button" onClick={this.deletarPropriedade}><a href="">Excluir</a></button>
				</div>
			</>
		);
	}
}

export default Detail;