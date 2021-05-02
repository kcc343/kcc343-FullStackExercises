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
	if (blogs.length === 0) {
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

const mostBlogs = (blogs) => {
	let maxKey = "key"
	let maxValue = -1
	if (blogs.length === 0) {
		return { 'author' : "None", 'blogs' : -1 }
	}
	const totalBlog = blogs.reduce((result, {author}) => {
		if (result[author]) {
			result[author]++
		} else {
			result[author] = 1
		}
		return result
	}, {})
	for (const blog of Object.keys(totalBlog)) {
		if (totalBlog[blog] > maxValue) {
			maxKey = blog
			maxValue = totalBlog[blog]
		}
	}
	return { 'author': maxKey, 'blogs': maxValue }
}

const mostLikes = (blogs) => {
	let maxKey = "key"
	let maxValue = -1
	if (blogs.length === 0) {
		return { 'author' : "None", 'likes' : -1 }
	}
	const totalBlogLikes = blogs.reduce((result, {author, likes}) => {
		if (result[author]) {
			result[author] += likes
		} else {
			result[author] = likes
		}
		return result
	}, {})
	for (const blog of Object.keys(totalBlogLikes)) {
		if (totalBlogLikes[blog] > maxValue) {
			maxKey = blog
			maxValue = totalBlogLikes[blog]
		}
	}
	return { 'author': maxKey, 'likes': maxValue }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}