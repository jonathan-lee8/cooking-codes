console.log("Attached");

const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log

  // Collect values from the login form
  const user = document.querySelector('#login-user').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (user && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/account');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("Sent submit");

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  console.log(username, email, password);
  if (username && email && password) {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      console.log(response.body);
      return response.json();

    })
    .then((data) => {
      console.log(data);
      if (data) {
        document.location.replace(`/account/${data.id}`);
      } else {
        alert("ERROR");
      }
    })
  }
};


document.getElementById('login-box').addEventListener('click', loginFormHandler);

document.getElementById('sign-up').addEventListener('click', signupFormHandler);