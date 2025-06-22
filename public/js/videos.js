let currentPage = 1
const limit = 5

async function loadVideos(page = 1) {
  try {
    const res = await fetch(`/api/videos?page=${page}&limit=${limit}`)
    const data = await res.json()

    const container = document.getElementById('video-list')
    container.innerHTML = ''
    console.log('Fetched videos:', data.videos)

    data.videos.forEach(video => {
      const videoEl = document.createElement('div')
      videoEl.className = 'video-card'

      const thumbnailUrl = video.videoUrl
          .replace('/upload/', '/upload/so_1/')
          .replace(/\.mp4$/, '.jpg')

      const img = document.createElement('img')
      img.src = thumbnailUrl
      img.alt = video.title
      img.className = 'video-thumb'
      img.addEventListener('click', () => playVideo(video.videoUrl))

      const title = document.createElement('h3')
      title.textContent = video.title

      const desc = document.createElement('p')
      desc.textContent = video.description

      const small = document.createElement('small')
      small.textContent = `Uploaded by ${video.uploader?.name || 'Unknown'}`

      videoEl.appendChild(img)
      videoEl.appendChild(title)
      videoEl.appendChild(desc)
      videoEl.appendChild(small)

      container.appendChild(videoEl)
    })

    document.getElementById('page-info').innerText = `Page ${data.page}`
    document.getElementById('prev').disabled = data.page <= 1
    document.getElementById('next').disabled = data.page >= data.totalPages

    currentPage = data.page
  } catch (err) {
    console.error('Failed to load videos:', err)
    alert('Failed to load videos. Please try again later.')
  }
}

function playVideo(url) {
  const videoWindow = window.open('', '_blank', 'width=720,height=480')
  videoWindow.document.write(`
    <title>Playing Video</title>
    <video width="100%" height="100%" controls autoplay>
      <source src="${url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `)
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prev').addEventListener('click', () => loadVideos(currentPage - 1))
  document.getElementById('next').addEventListener('click', () => loadVideos(currentPage + 1))
  loadVideos()
})