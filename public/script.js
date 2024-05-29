document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
      });
  
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
      });
  
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
