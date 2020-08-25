import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Rebel Code',
      url: '',
      techs: [],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <>
      <header id='main-header'>
        <h1>Repositórios GitHub</h1>
      </header>
      <div className="container">
        <div id="elements">
          <h2>Lista de repositórios Github</h2>


          <ul data-testid="repository-list">
            {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                
                <button id="goToButton" href="{repository.url}" target="_blanck">Acessar</button>

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))}
            <button onClick={handleAddRepository}>Adicionar</button>
          </ul>

        </div>
      </div>

    </>
  );
}

export default App;
