/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/* NYT Ad Tracker :::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/* Version: 1.0.1 :::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/* Team: Creative Technology T-Brand Studio  ::::::::::::::::::::::::::: */
/* Last updated: 07.07.2023  ::::::::::::::::::::::::::::::::::::::::::: */
/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


window.ET = function () {

    let prop,pos,clickThrough,ctx_id,lineitemid,viewport,orderid,creativeid,uap,pv_id,numberOfSlides,currentSlide,indexTracker,subject,postMessage;

    try {

        return {

            /* 
            "app" is used since this was the mobile app method we used 
            in the past and post message for web in the past 
            */ 

            "appmessaging": function (data) {
                console.debug("trigger app tracking: ",data);
                try {  nyt_et("send", data); }
                catch (Error) {console.debug(Error.message);}
            },


            /* 
            track function is mostly used for interaction tracking
            */

            "track": function (data) {

                console.debug("track: ",data);

                let dataType = data.type, dataLocation = data.location;
                let processEvent = true;
                try {

                let containerBody = document.getElementsByTagName('body')[0]; /* << this is new */
                let videoStats = containerBody.dataset.videostats;
                let videoStatsObj = typeof videoStats !== "undefined" ? videoStats.split(',') : [];
                if (dataType === 'video' && !isNaN(parseInt(dataLocation)) && videoStatsObj !== null) {

                    if (videoStatsObj.length > 0 && videoStatsObj.includes(dataLocation)) {
                    console.debug('Event Exists: ', dataLocation);
                    processEvent = false;
                    } 
                    
                    else {
                        if ( dataLocation > 0 && !videoStatsObj.includes( String( parseInt(dataLocation) - 25 ) ) ) {
                            console.debug('Event Not In Order: ', dataLocation);
                            processEvent = false;
                        } 
                        
                        else {
                            videoStatsObj.push(dataLocation);
                            containerBody.dataset.videostats = dataLocation === '0' ? dataLocation : videoStatsObj.join(',');
                        }
                    }

                }
                
                } catch (e) { console.debug("Video Ad Unit: ",e); }


                if( processEvent ) {

                    let daData = {
                        "dfp_creativeid": `${creativeid}`,
                        "dfp_orderid": `${orderid}`,
                        "dfp_pvid": `${pv_id}`,
                        "dfp_lineitemid": `${lineitemid}`,
                        "dfp_viewport": `${viewport}`,
                        "dfp_pos": `${pos}`,
                        "dfp_prop": `${prop}`,
                        "dfp_event_type": data["type"],
                        "dfp_event_location": data["location"],
                        "subject": `${subject}`
                    }

                    this.appmessaging(daData);

                } 
                            
            },

             /* << this is new */
            "clearLocalEventTrackingStorage": function () {
                let containerBody = document.getElementsByTagName('body')[0];
                containerBody.dataset.videostats = "";
            },

            /*
            exit function is mostly used for clickout tracking
            */

            "exit": function (data) {

                this.track ({
                    "type": data["type"],
                    "location": data["location"]
                });
                data.url ? window.open(data.url) : window.open(`${clickThrough}`);

            },

            /* 
            next function is mostly used for next slide tracking, this function requires 
            a total number of slide to work properly
            */
            
            "next": function () {
                currentSlide++;
                if (numberOfSlides) { 
                    if (currentSlide > numberOfSlides){currentSlide = 1;} 
                    indexTracker.push(currentSlide);

                    this.track({
                        "type": "slideURL",
                        "location": "slide-" + indexTracker[indexTracker.length-2] + "_" + "slide-" + currentSlide
                    });
                }
                else { console.debug("next function not working"); }
            
            },

            /*
            prev function is mostly used for previous slide tracking, this function requires
            a total number of slide to work properly
            */

            "prev": function () {
                currentSlide--;
                if (numberOfSlides) { 
                    if (currentSlide < 1){ currentSlide = numberOfSlides; } 
                    indexTracker.push(currentSlide);

                    this.track({
                        "type": "slideURL",
                        "location": "slide-" + indexTracker[indexTracker.length-2] + "_" + "slide-" + currentSlide
                    });
                }
                else { console.debug("prev function not working"); }
            },

            "listener": function (e) {
                if (e.target.className.includes('NYTAdTrack')) {
                    const eventType = e.target.getAttribute('data-event-type'),
                        eventLocation = e.target.getAttribute('data-event-location');
                
                    if (typeof eventType !== 'undefined' && typeof eventLocation !== 'undefined' && eventType && eventLocation) {

                        this.track(({
                            'type': eventType,
                            'location': eventLocation
                        }));
                    }
                }
            }, 

            "init": (data) => {

                /* the following code is to load the external JS snippet written by the NYT ET team */

                const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
                    return new Promise((resolve, reject) => {
                        try {
                            const scriptEle = document.createElement("script");
                            scriptEle.type = type;
                            scriptEle.async = async;
                            scriptEle.src =FILE_URL;
                            scriptEle.addEventListener("load", (ev) => {resolve({ status: true });});
                            scriptEle.addEventListener("error", (ev) => {reject({status: false, message: `Failed to load the script ＄{FILE_URL}`});});
                            document.body.appendChild(scriptEle);
                        } 
                        
                        catch (error) { reject(error); }
                    });
                };

                /* ::::::::: loading data from Ad styles ::::::::::::: */
                
                data["prop"] ? prop = data["prop"] : prop = "";
                data["pos"] ? pos = data["pos"] : pos = "";
                data["exit"] ? clickThrough = data["exit"] : clickThrough = "http://www.nytimes.com";
                data["ctx_id"] ? ctx_id = data["ctx_id"] : ctx_id = "context_id_placeholder";
                data["lineitemid"] ? lineitemid = data["lineitemid"] : lineitemid = "LID_placeholder";
                data["viewport"] ? viewport = data["viewport"] : viewport = "V_placeholder";
                data["orderid"] ? orderid = data["orderid"] : orderid = "OID_placeholder";
                data["creativeid"] ? creativeid = data["creativeid"] : creativeid = "CID_placeholder";
                data["uap"] ? uap = data["uap"] : uap = "";
                data["pv_id"] ? pv_id = data["pv_id"] : pv_id = "PID_placeholder";
                data["numberOfSlides"] ? numberOfSlides = data["numberOfSlides"] : numberOfSlides = 1;
                currentSlide = 1;
                indexTracker = [currentSlide];
                data["subject"] ? subject = data["subject"] : subject = "dfp-ad-events";

                document.addEventListener('click', e => { try { ET.listener(e); } catch(e) { console.debug(e.message); }});

                loadScript("https://nyt-dti-prd-staticjs.storage.googleapis.com/analytics/et2/eventtracker-snippet.js")
                .then( data  => { 
                    console.debug("ET snippet Script loaded successfully");

                    nyt_et('init', 'https://a.et.nytimes.com/', 'native_app_ads',{  
                        "pv_id_override": pv_id, 
                        "ctx_id_override": "context_id_placeholder_to_make_test_context_id" 
                    });
                
                })
                .catch( err => { console.error(err); });

            }

        }

    }
    catch (Error) {console.debug(Error.message);}

}();
