document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/videos/recommended');
    const videos = await res.json();

    const container = document.getElementById('recommended-list');
    container.innerHTML = '';

    videos.forEach(video => {
      const videoEl = document.createElement('div');
      videoEl.className = 'video-card';

      const thumbnailUrl = video.videoUrl
        .replace('/upload/', '/upload/so_1/')
        .replace(/\.mp4$/, '.jpg');

      const img = document.createElement('img');
      img.src = thumbnailUrl;
      img.alt = video.title;
      img.className = 'video-thumb';
      img.addEventListener('click', () => playVideo(video.videoUrl));

      const title = document.createElement('h3');
      title.textContent = video.title;

      const desc = document.createElement('p');
      desc.textContent = video.description;

      const small = document.createElement('small');
      small.textContent = `Uploaded by ${video.uploader?.name || 'Unknown'}`;

      videoEl.appendChild(img);
      videoEl.appendChild(title);
      videoEl.appendChild(desc);
      videoEl.appendChild(small);

      container.appendChild(videoEl);
    });
  } catch (err) {
    console.error('Failed to fetch recommended videos:', err);
    alert('Failed to render recommended videos.');
  }
});

function playVideo(url) {
  const videoWindow = window.open('', '_blank', 'width=720,height=480');
  videoWindow.document.write(`
    <title>Playing Video</title>
    <video width="100%" height="100%" controls autoplay>
      <source src="${url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `);
}