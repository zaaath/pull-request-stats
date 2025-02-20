const get = require('lodash.get');
const parseUser = require('./parseUser');

module.exports = (data = {}, pullRequest) => {
  const author = parseUser(data.author);
  const isOwnPull = author.login === pullRequest.authorLogin;
  const submittedAt = new Date(data.submittedAt);
  const startDate = pullRequest.publishedAt;

  return {
    author,
    isOwnPull,
    submittedAt,
    id: get(data, 'id'),
    commentsCount: get(data, 'comments.totalCount'),
    timeToReview: submittedAt - startDate,
  };
};
