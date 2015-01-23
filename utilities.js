/*global ig*/
ig.module(
	'plugins.domain.utilities'
).requires().defines(function () {
	'use strict';
	var DomainUtilities = {
			getReferrerHostname: function () {
				var a = document.createElement('a');
				a.href = document.referrer;
				return a.hostname;
			},
			inIframe: function () {
				try {
					return window.self !== window.top;
				} catch (e) {
					return true;
				}
			},
			isCurrentDomainAllowed: function (domainArray) {
				var isAllowed = false,
					i;
				if (ig.inIframe()) {
					for (i = 0; i < domainArray.length; i += 1) {
						if (ig.getReferrerHostname().match(new RegExp('([^\/]+.)?' + domainArray[i] + '(\/|$)', 'i'))) {
							isAllowed = true;
						}
					}
				} else {
					for (i = 0; i < domainArray.length; i += 1) {
						if (window.location.hostname.match(new RegExp('([^\/]+.)?' + domainArray[i] + '(\/|$)', 'i'))) {
							isAllowed = true;
						}
					}
				}
				return isAllowed;
			},
			isCurrentDomain: function (domain) {
				var isDomain = false;
				if (ig.getReferrerHostname().match(new RegExp('([^\/]+.)?' + domain + '(\/|$)', 'i'))) {
							isDomain = true;
						}
				return isDomain;
			}
		},

		methodName;

	function installFunction(name, fn) {
		if (ig[name]) {
			throw ("Domain Utilities method " + name + "() already defined elsewhere.");
		}
		Object.defineProperty(ig, name, {
			value: fn,
			enumerable: false
		});
	}
	for (methodName in DomainUtilities) {
		if (DomainUtilities.hasOwnProperty(methodName)) {
			installFunction(methodName, DomainUtilities[methodName]);
		}
	}
});