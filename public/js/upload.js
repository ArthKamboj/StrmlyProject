document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  
  const res = await fetch('/api/videos/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getCookie('token')}` // if needed
    },
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById('error-msg').innerText = data.error || "Upload failed.";
  } else {
    alert("Video uploaded successfully!");
    window.location.href = '/dashboard';
  }
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}