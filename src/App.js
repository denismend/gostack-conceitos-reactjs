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
      title: `Desafio React ${Date.now()}`,
      url: 'https://github.com/denismend/gostack-conceitos-reactjs',
      techs: ["Nodejs", "Reactjs", "Javascript"]
    });

    const repository = response.data;

    // add new repository in list 
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(`id = ${id}`);

    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      const newRepositories = repositories.filter(repository => {
        return repository.id !== id;
      });

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={ repository.id }>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
