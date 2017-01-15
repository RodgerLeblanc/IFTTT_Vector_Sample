# IFTTT_Vector_Sample
Vector stream that would use IFTTT to populate personalized content

To use it, create a new Applet in IFTTT, choose whatever trigger you want (This) and choose Maker as action (That). Construct the URL as follow :

https:///endpoint.vector.watch/VectorCloud/rest/v1/stream/{streamUUID}/webhook?id={your_id}&msg={message_from_IFTTT_applet}


- `streamUUID`: Your stream UUID can be found in the URL for your stream in Vector Developer portal.
- `your_id`: This is the ID generated when you subscribe to the stream, it will be printed in VectorWatch Android app on the stream configuration page.
- `message_from_IFTTT_applet`: This is an IFTTT ingredient, in other words what IFTTT propose to send as message for the trigger you selected. For instance, an RSS trigger could send `{{EntryTitle}}` ingredient as message, your stream would then show the article title whenever there's a new article available.

You can use multiple IFTTT Applet with the same stream if you want.
