const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#song').value.trim();
    const needed_funding = document.querySelector('#artist').value.trim();
    const description = document.querySelector('#genre').value.trim();
  
    if (name && artist && genre) {
      const response = await fetch(`/api/song`, {
        method: 'POST',
        body: JSON.stringify({ name, artist, genre }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to add song');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/song/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  