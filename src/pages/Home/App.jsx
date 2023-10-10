import { Header } from '../../components/Header/header.jsx';
import { ListItems } from '../../components/RepositoriesListItems/ListItems.jsx';
import background from '../../assets/background.png';
import './home.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={ background } className='background' alt="backgrond from github"/>

        <section className='info'>
          <input 
            type="text" 
            name="user" 
            placeholder="@usuário" 
            value={user} 
            onChange={event => setUser(event.target.value)}
          />

          <button onClick={handleGetData}>Buscar</button>
        
          {currentUser ? (<>
            <div className='profile-field'>
              <img src={currentUser.avatar_url} alt="Profile" className="profile-picture" />
              <article className='personal-info'>
                <h2 className='profile-name'>{currentUser.name}</h2>
                <p>@{currentUser.login}</p>
                <p className='profile-info'>{currentUser.bio}</p>
              </article>
            </div>
            <hr />
            </>
          ): null}


          {repos ? (<>
          <section id='repositories'>
            <h2>Repositórios</h2>

            {repos.map((repo, i) => (
              <ListItems key={i} title={repo.name} description={repo.description} />
            ))}


          </section>
          </>): null}
        </section>


      </div>
    </div>
  );
}

export default App;
