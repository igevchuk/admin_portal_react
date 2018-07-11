import * as xhr from './ajax.jsx'

var deferredAjax = {};
var neverCompleteDeferredObject = $.Deferred();

var ajaxOverride = () => neverCompleteDeferredObject;

export function xhrS(context, rejectPending, type) {
  if (xhr.isPending(deferredAjax[context])) {
    if (rejectPending) {
      deferredAjax[context].reject(undefined);
    } else {
      return ajaxOverride;
    }
  }

  return function () {
    return deferredAjax[context] = xhr[type].apply(xhr, arguments);
  };
}

export var getS = (context, rejectPending) => xhrS(context, rejectPending, 'get');
export var postS = (context, rejectPending) => xhrS(context, rejectPending, 'post');
export var ajaxS = (context, rejectPending) => xhrS(context, rejectPending, 'ajax');
