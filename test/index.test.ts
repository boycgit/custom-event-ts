// @ts-ignore
import GlobalEvent from "../src/index";

describe('CustomEvent', function () {

    describe('new CustomEvent()', function () {

        it('should create a `CustomEvent` instance', function () {
            var e = new CustomEvent('cat');

            expect(e.type).toBe('cat');
            expect(e.bubbles).toBeFalsy();
            expect(e.cancelable).toBeFalsy();
            expect(e.detail).toBeNull();
        });

        it('should create a `CustomEvent` instance with a `details` object', function () {
            var e = new CustomEvent('meow', { detail: { foo: 'bar' } });

            expect(e.type).toBe('meow');
            expect(e.bubbles).toBeFalsy();
            expect(e.cancelable).toBeFalsy();
            expect(e.detail.foo).toBe('bar');
        });

        it('should create a `CustomEvent` instance with a `bubbles` boolean', function () {
            var e = new CustomEvent('purr', { bubbles: true });

            expect(e.type).toBe('purr');
            expect(e.bubbles).toBeTruthy();
            expect(e.cancelable).toBeFalsy();
            expect(e.detail).toBeNull();
        });

        it('should create a `CustomEvent` instance with a `cancelable` boolean', function () {
            var e = new CustomEvent('scratch', { cancelable: true });

            expect(e.type).toBe('scratch');
            expect(e.bubbles).toBeFalsy();
            expect(e.cancelable).toBeTruthy();
            expect(e.detail).toBeNull();
        });

        it('should create a `CustomEvent` instance that is dispatchable', function (done) {
            var e = new CustomEvent('claw', {
                bubbles: true,
                cancelable: true,
                detail: { canhaz: 'cheeseburger' }
            });

            function onclaw(ev: any) {
                if (!ev) ev = window.event;

                expect(e.type).toBe('claw');
                expect(e.bubbles).toBeTruthy();
                expect(e.cancelable).toBeTruthy();
                expect(e.detail.canhaz).toBe('cheeseburger');
                done();
            }

            if (document.body.dispatchEvent) {
                document.body.addEventListener('claw', onclaw, false);
                document.body.dispatchEvent(e);
            } else {
                // IE <= 8 will only allow us to fire "known" event names,
                // so we need to fire "click" instead of "claw :\
                (document.body as any).attachEvent('onclick', onclaw);

                // need to fire event in a separate tick for some reason…
                setTimeout(function () {
                    (e as any).type = 'click';
                    (e as any).eventName = 'click';
                    (e as any).eventType = 'click';

                    (document.body as any).fireEvent('onclick', e);
                }, 50);
            }
        });

    });

});