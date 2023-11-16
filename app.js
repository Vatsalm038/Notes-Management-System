$(document).ready(() => {
    // Your jQuery code for login, registration, notes creation, and notes viewing
  
    // Register button click event
    $('#register-btn').on('click', () => {
      const username = $('#register-username').val();
      const password = $('#register-password').val();
  
      // Send registration data to the server
      $.post('http://localhost:3000/register', { username, password }, (data, status) => {
        console.log(data);
      });
    });
  
    // Login button click event
    $('#login-btn').on('click', () => {
      const username = $('#login-username').val();
      const password = $('#login-password').val();
  
      // Send login data to the server
      $.post('http://localhost:3000/login', { username, password }, (data, status) => {
        console.log(data);
      });
    });
  
    // Add note button click event
    $('#add-note-btn').on('click', () => {
      const username = $('#note-username').val();
      const note = $('#note-text').val();
  
      // Send note data to the server
      $.post('http://localhost:3000/notes', { username, note }, (data, status) => {
        console.log(data);
      });
    });
  
    // View notes button click event
    $('#view-notes-btn').on('click', () => {
      const username = $('#view-notes-username').val();
  
      // Retrieve notes data from the server
      $.get('http://localhost:3000/notes', { username }, (data, status) => {
        console.log(data);
      });
    });
  
    // Logout button click event
    $('#logout-btn').on('click', () => {
      // Implement logout logic (clear tokens, redirect, etc.)
      console.log('Logout clicked');
    });
  });
  