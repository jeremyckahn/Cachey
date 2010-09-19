/* Cachey jQuery Plugin
 * 
 * A collaboration between:
 * 
 * Ross Davidson - draggor@gmail.com
 * Jeremy Kahn - jeremyckahn@gmail.com
 * Ben Mills - ben@bmdev.org
 * 
 * To use, simply load this script after you load jQuery.  As elements are selected, they are cached.  
 * When they are called again, the cached reference is called automatically, there is no DOM traversal.
 * Usage is completely transparent, just load this file and your apps will go faster. :)
 */

jQuery(function(){
	setTimeout(function(){
		(jQuery.fn.cachey = function() {
				
			jQuery.noConflict();
	            
			// Cache Holder
	        	window.cachey_cache = {},
			$ = function(sel, context) {

			/**
			* Do not execute caching logic if:
			* 
			* 1. sel isn't a selector.
			* 
			* 2. A context was provided.  Logic needed to account for that would slow down the plugin overall, and contexts are provided as a performance boost anyways, so caching it would yield diminishing returns.
			* 
			* 3. sel is actually a new HTML element (The regexp was taken from the jQuery source for a similar purpose)
			*/
			if(typeof sel !== 'string'
				|| context
				|| /^[^<]*(<[\w\W]+>)[^>]*$|/.exec(sel)[1]) {
	                    	return jQuery(sel, context);
			} 

			if (cachey_cache[sel]) {
			// If selector exists, return the cached version.
				return cachey_cache[sel];
			} else {
			// Otherwise return the selected object and add it to the cache holder.
				return cachey_cache[sel] = jQuery(sel, context);
	            		}
	            	};
				
				// Attach all jQuery utility functions to the new $ object
				for(k in jQuery) {
					$[k] = jQuery[k];
				}
				
				// Give $ (not the jQuery object) the ability flush the cache
				$.flush = function(){
					window.cachey_cache = {};	
				};
				
		})()
	}, 0);
});