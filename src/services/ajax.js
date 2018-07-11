export function isPending(deferred) {
  return deferred && deferred.state() == 'pending';
}

export class AjaxRequestQueue {
  static isPending(deferred) {
    return isPending(deferred);
  }

  constructor(requestObj, request, config) {
    if (config.inlineCallbackName) {
      //Not everything is based on promises.
      this.inlineCallbackName = config.inlineCallbackName;
      this.inlineArgIndex = config.inlineArgIndex || 0;
    } else {
      //For any given arbitrary asynchronous object, map identical
      //callbacks.
      this.doneName = config.doneName || 'done';
      this.failName = config.failName || 'fail';
      this.alwaysName = config.alwaysName || 'always';
      this.abortName = config.abortName || null;
    }

    this.requestObj = requestObj;
    this.requestFn = request;

    if (config.parent) {
      this.queued = config.parent.queued;
      this.running = config.parent.running;
      this.limit = config.parent.limit;
    } else {
      this.queued = [];
      //The purpose of this is due to outside rejects potentially occuring in either running OR queued requests.  They need to be handled differently, with running requests causing dequing while queued requests should just be spliced from the queue.
      this.running = [];
      this.limit = config.limit || appConfig.MAX_ASYNC_CONNECTIONS || 5;
    }
  }

  /* The deferred object this queue maintains always calls this to free up the
   * queue.
   */
  always(deferred) {
    //Max size of this.running is < 10 on average.
    var index = this.running.indexOf(deferred);
    if (index == -1) {
      //Always search this in reverse, as this rejection method is fastest for bulk rejections (thus preventing ajax calls from actually initiating)
      //Usually this array is not too big (e.g. having >1000 ajax requests is a bit much)
      this.queued.splice(this.queued.lastIndexOf(deferred), 1);
      return;
    }

    this.running.splice(index, 1);
    if (this.queued.length) {
      var queued = this.queued.shift();
      var reqQueue = queued[0];
      var args = queued[1];

      if (reqQueue.inlineCallbackName) {
        reqQueue.handleInlineRequest.apply(reqQueue, args);
      } else {
        reqQueue.handleRequest.apply(reqQueue, args);
      }
    }
  }

  //Same as request, but puts the request at the front of the queue.
  priorityRequest() {
    var self = this;
    var deferred = jQuery.Deferred();
    //Bind queue-freeing operations here in case the deferred object is
    //resolved/rejected outside the queue instance.
    deferred.always(function () {
      self.always(deferred);
    });

    if (this.limit - this.running.length) {
      if (this.inlineCallbackName) {
        this.handleInlineRequest(deferred, arguments);
      } else {
        this.handleRequest(deferred, arguments);
      }
    } else {
      this.queued.unshift([this, [deferred, arguments]]);
    }

    return deferred;
  }

  //Queues the request.
  request() {
    var self = this;
    var deferred = jQuery.Deferred();
    //Bind queue-freeing operations here in case the deferred object is
    //resolved/rejected outside the queue instance.
    deferred.always(function () {
      self.always(deferred);
    });

    if (this.limit - this.running.length) {
      if (this.inlineCallbackName) {
        this.handleInlineRequest(deferred, arguments);
      } else {
        this.handleRequest(deferred, arguments);
      }
    } else {
      this.queued.push([this, [deferred, arguments]]);
    }

    return deferred;
  }

  handleInlineRequest(deferred, args) {
    var self = this;
    this.running.push(deferred);

    args[this.inlineArgIndex][this.inlineCallbackName] = deferred.resolve;
    this.requestFn.apply(this.requestObj, args);
  }

  handleRequest(deferred, args) {
    //Give up on broken promises.  Allow external rejection/resolution.
    if (!isPending(deferred)) {
      return;
    }

    this.running.push(deferred);
    var requestResult = this.requestFn.apply(this.requestObj, args);

    requestResult[this.doneName](deferred.resolve);
    requestResult[this.failName](deferred.reject);

    //The deferred object can potentially be resolved/rejected outside of
    //the AJAX request.  In that case, abort the AJAX request.
    if (this.abortName) {
      deferred.always(requestResult[this.abortName]);
    }
    //Doing this is not absolutely necessary, but if the server can figure
    //out that a request has been aborted, then it can be a bit more
    //efficient.
  }
}

export var getQueue = new AjaxRequestQueue($, $.get, {
  'abortName': 'abort'
});

export var postQueue = new AjaxRequestQueue($, $.post, {
  'abortName': 'abort',
  'parent': getQueue
});

export var ajaxQueue = new AjaxRequestQueue($, $.ajax, {
  'abortName': 'abort',
  'parent': getQueue
});

export function get() {
  return getQueue.request.apply(getQueue, arguments);
}

export function post() {
  return postQueue.request.apply(postQueue, arguments);
}

export function ajax() {
  return ajaxQueue.request.apply(ajaxQueue, arguments);
}

//This is where it gets sketchy (fun!).  We depend on jQuery, but we also want to modify jQuery. The functions however have the exact same interface.
jQuery.get = get;
jQuery.post = post;
jQuery.ajax = ajax;
