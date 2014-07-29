if (process.env.NODE_ENV == 'dev') {
	fis.config.merge({
		roadmap: {
			domain: 'http://localhost:3100'
		}
	});
} else {
	fis.config.merge({
		roadmap: {
			domain: 'http://xxx.com'
		}
	})
}