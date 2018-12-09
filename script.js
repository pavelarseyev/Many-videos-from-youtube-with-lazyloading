function addVideosToPage(videoWrapperClass, linkClass, imageClass, buttonClass, enabledClass){
	function findVideos() {
		//take all videos
		let videos = document.querySelectorAll(videoWrapperClass);
		//run functions for each video on the page
		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function setupVideo(video) {
		//link to video
		let link = video.querySelector(linkClass);
		//video preview
		let media = video.querySelector(imageClass);
		//play button
		let button = video.querySelector(buttonClass);
		//parse id of video from url of image in current videowrapper
		let id = parseMediaURL(media);

		//add creating iframe instead of videolink by clicking videowrapper
		video.addEventListener('click', () => {
			//create iframe
			let iframe = createIframe(id);
			//revome link
			link.remove();
			//remove button
			button.remove();
			//place iframe inside the videowrapper
			video.appendChild(iframe);
		});

		//remove href from link to make the link just as container
		link.removeAttribute('href');
		//add class that shows our youtube button
		video.classList.add(enabledClass.replace('.', ''));
	}

	//pasrse video ID from img's url
	function parseMediaURL(media) {
		let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
		let url = media.src;
		let match = url.match(regexp);

		return match[1];
	}

	//creating iframe
	function createIframe(id) {
		let iframe = document.createElement('iframe');
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add(imageClass.replace('.', ''));

		return iframe;
	}
	//generating url for iframe
	function generateURL(id) {
		let query = '?rel=0&showinfo=0&autoplay=1';

		return 'https://www.youtube.com/embed/' + id + query;
	}

	findVideos();
}

addVideosToPage('.video', '.video__link', '.video__media', '.video__button', '.video--enabled');
