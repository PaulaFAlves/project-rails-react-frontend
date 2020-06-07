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
	const [cultivares, setCultivares] = useState('');

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

	function handleSelectedEspecie(e) {
		const especieSelecionada = e.target.value;
		setEspecieSelecionada(especieSelecionada);
		setEspecie(especieSelecionada);
	}
	console.log(cultivares)
	console.log(especies)


		return(
			<div>
				<NavBar />
				<div className="formulario-main">
					<form className="formulario-inclusao">
						<input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
						<select 
							name="especie" 
							id="especie" 
							value={especie.id} 
							onChange={handleSelectedEspecie}>
							<option value="0">Selecione uma especie</option>
							{especies.map(especie => (
								<option key={especie.id} value={especie.id}>{especie.nome}</option>
							))}
						</select>
					
						<input type="text" placeholder="Cultivar" value={cultivar} onChange={e => setCultivar(e.target.value)}/>
						<input type="text" placeholder="Area" value={area} onChange={e => setArea(e.target.value)} />
						<input type="text" placeholder="Unidade" value={unidade} onChange={e => setUnidade(e.target.value)} />
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