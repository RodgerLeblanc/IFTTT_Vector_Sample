"use strict";

var VectorWatch = require('vectorwatch-sdk');
var vectorWatch = new VectorWatch();
var logger = vectorWatch.logger;

vectorWatch.on('config', function(event, response) {
    // your stream was just dragged onto a watch face
    logger.info('on config');

    var id = response.createGridList('Id');
    id.setHint('This is your unique identifier (id). Create an IFTTT applet with any trigger that will send an HTTP request using Maker to https:///endpoint.vector.watch/VectorCloud/rest/v1/stream/{streamUUID}/webhook?id={your_id}&msg={message from IFTTT applet}');
    id.addOption(Date.now());
    
    response.send();
});

vectorWatch.on('subscribe', function(event, response) {
    // your stream was added to a watch face
    logger.info('on subscribe');

    response.setValue("Waiting IFTTT");
    response.send();
});

vectorWatch.on('unsubscribe', function(event, response) {
    // your stream was removed from a watch face
    logger.info('on unsubscribe');
    response.send();
});

vectorWatch.on('webhook', function(event, response, records) {
    logger.info('on webhook');
    
    var id = event.getQuery()['id'];
    var msg = event.getQuery()['msg'];
    if ((id === undefined) || (msg === undefined)) { return; }
    
    // Find the right user
    var record = records.find(function(r) {
        var settings = r.userSettings;
        return settings.Id === id;
    });

    if (record !== undefined) {
        record.pushUpdate(msg);
    }
});
