Template.tweetBox.helpers({
  charCount: function() {
    // return the max char count minus the number of characters typed
    return 300 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 300) {
      return 'errCharCount';
    } else {
      return 'charCount';
    }
  },

  disableButton: function() {
    // disable button only if characters greater than or equal to 0, greater than 300
    // or the client is not a registered user
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 300 ||
        !Meteor.user()) {
      return 'disabled';
    }
  }
});

Template.tweetBox.events({
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);
  },

  'click button': function() {
    var tweet = $('#tweetText').val();
    $('#tweetText').val("");
    Session.set('numChars', 0);
    Meteor.call('insertTweet', tweet);
  }
});

Template.tweetBox.onRendered(function () {
  Session.set('numChars', 0);
});
