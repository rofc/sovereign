Template.postComment.rendered = function () {
  var commentBox = this.lastNode.firstChild.nextElementSibling;
  if (commentBox.innerText != TAPi18n.__('argue')) {
    commentBox.focus();
  }
};

Template.postComment.events({
  "keypress #postComment": function (event) {
    if (event.which == 13) {
      event.preventDefault();

      if (!this.replyMode) {
        Modules.client.addEvent(
          Session.get('contract')._id,
          {
            userId: Meteor.userId(),
            action: 'COMMENT',
            content: document.getElementById('postComment').innerText,
            sort: [],
            sortTotal: 0
          }
        );
        cleanCommentBox();
      } else {
        console.log("Es un reply");
      }
    }
  },
  "click #postComment": function (event) {
    if (!this.replyMode) {
      if ($('#postComment').attr('active') == 'false') {
         $('#postComment').attr('active', true);
         $('#postComment').attr('class', 'comment comment-post');
         document.getElementById('postComment').innerText = '';
      }
    }
  },
  "blur #postComment": function (event) {
    if (!this.replyMode) {
      if (document.getElementById('postComment').innerText == '') {
        cleanCommentBox();
      }
    }
  }
})

function cleanCommentBox() {
  $('#postComment').attr('active', false);
  $('#postComment').attr('class', 'comment comment-post comment-disabled');
  document.getElementById('postComment').innerText = TAPi18n.__('argue');
}