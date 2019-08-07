
function useNative() {
    const NativeCustomEvent = (window as any).CustomEvent;
    try {
        var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
        p.preventDefault();
        if (p.defaultPrevented !== true) {
            // IE has problems with .preventDefault() on custom events
            // http://stackoverflow.com/questions/23349191
            throw new Error('Could not prevent default');
        }
        return 'cat' === p.type && 'bar' === p.detail.foo;
    } catch (e) {
    }
    return false;
}

export interface ICustomEventParams {
    /**
     * 是否冒泡
     * 
     * @type {boolean}
     */
    bubbles?: boolean; 

    /**
     * 是否阻止冒泡
     * 
     * @type {boolean}
     */
    cancelable?: boolean; 

    /**
     * 传输的事件数据
     *
     * @type {{[key: string]: any}}
     */
    detail?: {[key: string]: any}; 

}

function _CustomEventPolyfill() {
    // 没有 window 对象
    if (typeof window === 'undefined') {
        return;
    }

    // 如果本身就支持 CustomEvent 对象
    if (useNative()) {
        return;
    }


        // IE >= 9
        'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent(type: string, params: ICustomEventParams = {}) {
            const { bubbles = false, cancelable = false, detail = null } = params;
            const evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type, bubbles, cancelable, detail);

            // 解决 IE 中的 `preventDefault` 属性的问题
            const origPrevent = evt.preventDefault;
            evt.preventDefault = function () {
                origPrevent.call(this);
                try {
                    Object.defineProperty(this, 'defaultPrevented', {
                        get: function () {
                            return true;
                        }
                    });
                } catch (e) {
                    this.defaultPrevented = true;
                }
            }

            return evt;
        } :

            // IE <= 8
            function CustomEvent(type: string, params: ICustomEventParams = {}) {
                var evt = (document as any).createEventObject();
                const { bubbles = false, cancelable = false, detail = null } = params;
                evt.type = type;
                evt.bubbles = Boolean(bubbles);
                evt.cancelable = Boolean(cancelable);
                evt.detail = detail;
                return evt;
            }

    CustomEvent.prototype = (window as any).Event.prototype;
    (window as any).CustomEvent = CustomEvent;
}

// 执行 polyfill
_CustomEventPolyfill();

var TARGET = document;
var EVENTS: { [key: string]: EventHandlerNonNull} = {};

/**
 * 触发自定义事件名
 * @param {String} eventName - 事件名
 * @param {Object} detail - 事件详细内容
 */
function _dispatchEvent(eventName: string, detail: any) {
    var event = new CustomEvent(eventName, {
        detail: detail
    });

    TARGET.dispatchEvent(event);
}

export default {
    CustomEvent: CustomEvent,
    events: EVENTS, // 返回定义在全局中的事件
    /**
     * 定义事件，全局事件名唯一，后定义的会覆盖之前定义的   
     * @param {String} eventName - 事件名
     * @param {Function} callback - 事件回调
     */
    on: function (eventName: string, callback: EventHandlerNonNull) {
        EVENTS[eventName] = callback;
        TARGET.addEventListener(eventName, callback);
    },

    /**
     * 删除事件
     * @param {String} eventName - 事件名
     */
    off: function (eventName: string) {
        TARGET.removeEventListener(eventName, EVENTS[eventName]);
        delete EVENTS[eventName];
    },

    /**
     * 触发事件
     * @param {String} eventName 
     * @param {Object} detail
     */
    dispatch: function (eventName: string, detail: any) {
        _dispatchEvent(eventName, detail || null);
    }
}



