const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length == 0) {
		return {}
	}
	let mostLiked = blogs[0]
	
	for (let i = 1; i < blogs.length; i++) {
		if (mostLiked.likes < blogs[i].likes) {
			mostLiked = blogs[i]
		}
	}
	return mostLiked
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}