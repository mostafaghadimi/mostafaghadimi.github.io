const staticDevPage = "dev-coffee-site-v1"

const img_url = "https://github.com/mostafaghadimi/mostafaghadimi.github.io/blob/master/files/img/";
const files_url = "https://github.com/mostafaghadimi/mostafaghadimi.github.io/blob/master/files/";

const assets = [
  "/",
  img_url + "browsing%20(1).png",
  img_url + "cv.png",
  img_url + "browsing.png",
  img_url + "github.png",
  img_url + "linkedin.png",
  img_url + "photo.jpg",
  img_url + "stackoverflow.png",
  img_url + "twitter.png",
  files_url + "cv.pdf",
  files_url + "github-light.css",
  files_url + "scale.fix.js",
  files_url + "style.css",
  files_url + "styles.css",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticDevPage).then(cache => {
        cache.addAll(assets)
      })
    )
  });


  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  });