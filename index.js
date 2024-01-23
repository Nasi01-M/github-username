document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');
    const userReposContainer = document.getElementById('userRepos');
  
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm) {
        // Search for users by name using User Search Endpoint
        const users = await searchUsers(searchTerm);
  
        // Display search results
        displaySearchResults(users);
      }
    });
  
    searchResultsContainer.addEventListener('click', async (event) => {
      if (event.target.dataset.username) {
        const username = event.target.dataset.username;
  
        // Fetch repositories for the selected user using User Repos Endpoint
        const userRepos = await getUserRepositories(username);
  
        // Display repositories for the selected user
        displayUserRepositories(userRepos);
      }
    });
  
    async function searchUsers(query) {
      const apiUrl = `https://api.github.com/search/users?q=${query}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      const data = await response.json();
      return data.items; 
    }
  
    function displaySearchResults(users) {
      searchResultsContainer.innerHTML = '';
  
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <p>${user.login}</p>
        `;
        userCard.dataset.username = user.login;
        searchResultsContainer.appendChild(userCard);
      });
    }
  
    async function getUserRepositories(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      return await response.json();
    }
  
    function displayUserRepositories(repos) {
      userReposContainer.innerHTML = '';
  
      repos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.classList.add('repo-item');
        repoItem.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description || 'No description available'}</p>
        `;
        userReposContainer.appendChild(repoItem);
      });
    }
  });
  