/**
 * es6를 빠르게 사용할수 있도록 짧은 메소드 제공.
 * User: DEV_JUNG
 * Date: 2018-07-04
 */
const sel = (v, el = document) => el.querySelector(v);
const selAll = (v, el = document) => el.querySelectorAll(v);
const _sel = el => typeof el === 'string' ? sel(el) : el;
const _selAll = el => typeof el === 'string' ? selAll(el) : Array.isArray(el) ? el : [el];
const attr = (el, ...attr) => (attr.some((k, i) => {
	if (i % 2 || !el) return;
const v = attr[i + 1];
if (typeof el[k] === 'function') el[k](...(Array.isArray(v) ? v : [v]));
else if (k[0] === '@') el.style[k.substr(1)] = v;
else el[k] = v, k.includes('class', 'value') && el.setAttribute(k, v);
}), el);
const celt = (tag, ...arg) => attr(typeof tag === 'string' ? document.createElement(tag) : tag, ...arg);
const prepend = (node, ...el) => (el.reverse().forEach(v => node.insertBefore(v, node.firstChild)), node);
const append = (node, ...el) => (el.forEach(v => node.appendChild(v)), node);
const err = (v = 'invalid') => { throw v; };
const override = () => err('override');
const prop = (t, p) => Object.assign({}, t, p);
const is = (t, p) => t instanceof p;
const ready = f => document.addEventListener('DOMContentLoaded', f);
const addEvent = (a, el, f) => _selAll(el).forEach(v => v.addEventListener(a, f));
const removeEvent = (a, el, f) => _selAll(el).forEach(v => v.removeEventListener(a, f));
const hide = (...arg) => arg.map(v => attr(_sel(v), '@display', 'none'));
const show = (...arg) => arg.map(v => attr(_sel(v), '@display', 'inline'));
const sval = (el, v = '') => (v ? _sel(el).value = v : _sel(el).value);
const setAttr = (el, k, v = '') => _sel(el).setAttribute(k, v);
const getAttr = (el, k) => _sel(el).getAttribute(k);
const adjacent = (el, v, pos = 'beforeend') => _sel(el).insertAdjacentHTML(pos, v);
const prependHtml = (el, v) => adjacent(el, v, 'afterbegin');
const appendHtml = (el, v) => adjacent(el, v, 'beforeend');
const getId = ((c = {}) => v => (c[v] = !!c[v] ? c[v] : document.getElementById(v)))();
/**
 * 타겟엘리먼트 하위 dom의 동적변화 여부에 관계없이 이벤트가 동작함.
 *  ex) onEvent('#delegateTarget')('click','#btn_',()=>{});
 * @param delegateTarget
 * @returns {Function}
 */
const onEvent = (delegateTarget='body') => (
	(a, el, f) => ( _selAll(delegateTarget).forEach(w => {
		w.addEventListener(a, e => (_selAll(el).forEach(v => {
			let t = e.target;
			while (t && t !== el) {
				if (t === v) return f.call(el, t);
				t = t.parentNode;
			}
		})))
	}))
);

const removeClass = (v, className) => {
	const sections = selAll(v);
	for (let i=0;i<sections.length;i++){
		sections[i].classList.remove(className);
	}
};
const parentTheClass = (v, className) => el.parentNode.classList.value === className ? true : false;
