const snoowrap = require('snoowrap');
require('dotenv').config();


const r = new snoowrap({
    userAgent: process.env.clientId,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken
  });

  async function post_to_reddit(postUrl, message) {
    try{
    // Parse the URL to get the post ID
    const urlObj = new URL(postUrl);
    const postId = urlObj.pathname.split('/')[4]; // Extract the post ID from the URL

    // Get the submission (post) by ID
    const submission = await r.getSubmission(postId).fetch();

    // Comment on the submission
    const comment = await submission.reply(message);
    console.log(`Commented on post: ${submission.title}`);

    // Get the permalink of the comment
    const replyLink = `https://www.reddit.com${comment.permalink}`;
    return {success: true, link: replyLink};
    }catch(error){
      console.log(error)
      return {success: false, message: error.message};
    }
}

module.exports ={
  post_to_reddit
}

