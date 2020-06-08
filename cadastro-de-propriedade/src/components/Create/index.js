import React, { useState, useEffect } from 'react';

import './styles.css';

import NavBar from '../NavBar';

function Create(props) {
	const [nome, setNome] = useState('')
	const [especie, setEspecie] = useState('')
	const [cultivar, setCultivar] = useState('')
	const [area, setArea] = useState('')
	const [unidade, setUnidade] = useState('')
	const [especies, setEspecies] = useState([]);
	const [especieSelecionada, setEspecieSelecionada] = useState('');
	const [cultivares, setCultivares] = useState([]);
	const [cultivarSelecionada, setCultivarSelecionada] = useState('');

	const handleSubmit = (async (e) => {
		e.preventDefault();
		await fetch('http://localhost:3001/propriedades',
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				propriedade: {
					nome: nome,
					especie: especie,
					cultivar: cultivar,
					area: area,
					unidade: unidade
				}
			})
		})
		setNome('');
		setEspecie('');
		setCultivar('');
		setArea('');
		setUnidade('');
		(window.alert('Cadastrado concluído com sucesso.'))
		window.history.back();
	});
		
	useEffect(() => {
		fetch('http://localhost:3001/especies')
		.then(response=> response.json())
		.then(data=> {
			const especies = data;
			setEspecies(especies);
		})
	}, []);

	useEffect(() => {
		console.log(especieSelecionada)
		if (especieSelecionada === '0') {
			return;
		}
		fetch('http://localhost:3001/cultivares')
		.then(response=> response.json())
		.then(data => {
			const cultivares = data.filter(item => {
				return item.especie_id === especieSelecionada
			});	
			setCultivares(cultivares)	
		})

	}, [especieSelecionada]);

	function handleEspecieSelecionada(e) {
		const especieSelecionada = e.target.value;
		setEspecieSelecionada(especieSelecionada);
		setEspecie(especieSelecionada);
	}

	function handleCultivarSelecionada(e) {
		const cultivarSelecionada = e.target.value;
		setCultivarSelecionada(cultivarSelecionada);
		setCultivar(cultivarSelecionada);
	}

	function handleUnidadeSelecionada(e) {
		const unidadeSelecionada = e.target.value;
		setUnidade(unidadeSelecionada);
	}
	console.log(cultivares)
	console.log(especies)


		return(
			<div>
				<NavBar />
				<h1 className="main-title">Incluir Cadastro</h1>
				<div className="formulario-main">
					<form className="formulario-inclusao">
						<label htmlFor="nome">Nome da Propriedade:</label>
						<input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)}/>
						<label htmlFor="especie">Selecione uma espécie:</label>
						<select 
							name="especie" 
							id="especie" 
							value={especie.id} 
							onChange={handleEspecieSelecionada}>
							<option value="0"></option>
							{especies.map(especie => (
								<option key={especie.id} value={especie.id}>{especie.nome}</option>
							))}
						</select>
						<label htmlFor="cultivar">Selecione uma cultivar:</label>
						<select 
							name="cultivar" 
							id="cultivar"
							value={cultivar}
							onChange={handleCultivarSelecionada}>
							<option value="0"></option>
							{cultivares.map(item => (
								<option key={item.id} value={item.id}>{item.nome}</option>
							))}
						
						</select>
						<label htmlFor="area">Área da propriedade:</label>						
						<input id="area" type="text" value={area} onChange={e => setArea(e.target.value)} />
						<label htmlFor="unidade">Selecione a unidade de medida:</label>
						<select 
							name="unidade" 
							id="unidade"
							value={unidade}
							onChange={handleUnidadeSelecionada}>
							<option value=""></option>
							<option value="mt2">mt2</option>
							<option value="ha">ha</option>
						</select>
					</form>
				</div>
				<div className="button-container">
					<button className="button"><a href="/">Voltar</a></button>
					<button className="button" type="submit" onClick={handleSubmit}>Cadastrar</button>
				</div>
			</div>
		);

}

export default Create;