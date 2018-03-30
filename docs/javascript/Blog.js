$(function(){
  var url = (window.location.hostname == 'localhost') ? '/javascript/posts.json' : 'https://medium.com/@bitcoinprivate/latest?format=json';
  $.getJSON(url).done(function(response){
		var data = (window.location.hostname == 'localhost') ? response : JSON.parse(response.contents.replace("])}while(1);</x>", '')).payload;

    // Users data
		var users = data.references.User;

    // Posts data
	  var posts = data.references.Post;

    // Posts HTML
	  var postsHtml = ''
	  Object.keys(posts).forEach(function(postId){
			// Post data
	    var post = posts[postId];

      // User data
			var user = users[post.creatorId];
			var username = user.username;
			var userName = user.name;
			var userImageUrl = 'https://cdn-images-1.medium.com/fit/c/72/72/' + user.imageId;

      // Post metadata
      var url = 'https://medium.com/@' + username + '/' + post.uniqueSlug;
			var currentYear = moment().year();
			var publishYear = moment(post.latestPublishedAt).year();
			var publishDate = (currentYear == publishYear) ? moment(post.latestPublishedAt).format('MMM Do') : moment(post.latestPublishedAt).format('MMM Do, YYYY');
			var readTime = Math.round(post.virtuals.readingTime);
			var image = post.virtuals.previewImage;
			var imageUrl = 'https://cdn-images-1.medium.com/fit/c/' + image.originalWidth + '/' + image.originalHeight + '/' + image.imageId;
			var title = post.title;
			var subtitle = post.virtuals.subtitle;

      // Post body
			//var paragraphs = post.previewContent.bodyModel.paragraphs;
			//var postBody = '';
			//paragraphs.forEach(function(paragraph){
			//	var text = paragraph.text.replace("\n", '<br/>');
			//	paragraphText = '<p>' + text + '</p>';
			//	postBody += paragraphText;
			//});

			var postBody = '';
			postBody += '<div class="post-image"><img src="' + imageUrl + '"></div>';
			postBody += '<div class="post-title">' + title + '</div>';
			postBody += '<div class="post-subtitle"><p>' + subtitle + '</p></div>';

      // Post HTML
      var postHtml = '<div class="post-article">'
			             + '  <div class="post-header">'
			             + '    <div class="post-avatar">'
			             + '      <img src="' + userImageUrl + '">'
			             + '    </div>'
			             + '    <div class="post-meta">'
			             + '      <div class="post-author">' + userName + '</div>'
			             + '      <div class="post-time">'
			             + '        <div class="post-date">' + publishDate + '</div>'
			             + '        <div class="post-divider">&#183;</div>'
			             + '        <div class="post-read">' + readTime + ' min read</div>'
			             + '      </div>'
			             + '    </div>'
			             + '  </div>'
			             + '  <a href="' + url + '" target="_blank"><div class="post-body">' + postBody + '</div></a>'
			             + '  <div class="post-footer">'
			             + '    <a href="' + url + '" target="_blank">Read more...</a>'
			             + '  </div>'
			             + '</div>';
			postsHtml += postHtml;
		});
		$('#posts').html(postsHtml);
  });
});