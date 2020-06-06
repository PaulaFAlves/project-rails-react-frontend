import React, { useState } from 'react';

import NavBar from '../NavBar';

function Create(props) {
	const [nome, setNome] = useState('')
	const [especie, setEspecie] = useState('')
	const [cultivar, setCultivar] = useState('')
	const [area, setArea] = useState(0)
	const [unidade, setUnidade] = useState('')

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
	});
		
	console.log(nome, especie);

		return(
			<div>
				<NavBar />
				<form>
					<input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
					<input type="text" placeholder="Especie" value={especie} onChange={e => setEspecie(e.target.value)}/>
					<input type="text" placeholder="Cultivar" value={cultivar} onChange={e => setCultivar(e.target.value)}/>
					<input type="text" placeholder="Area" value={area} onChange={e => setArea(e.target.value)} />
					<input type="text" placeholder="Unidade" value={unidade} onChange={e => setUnidade(e.target.value)} />
					<button type="submit" onClick={handleSubmit}>Cadastrar</button>
				</form>
				<button><a href="/">Voltar</a></button>
			</div>
		);

}

export default Create;