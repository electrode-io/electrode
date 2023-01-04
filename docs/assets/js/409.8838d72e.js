(self.webpackChunkelectrode_docs=self.webpackChunkelectrode_docs||[]).push([[409],{1739:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>f});var i=n(180),a=n.n(i),s=n(6280),r=n.n(s);r().tokenizer.separator=/[\s\-/]+/;const l=function(){function e(e){this.searchData=e,this.init(),this.titleHitsRes=[]}var t=e.prototype;return t.init=function(){var e=this.searchData;this.lunrIndex=r()((function(){var t=this;this.ref("id"),this.field("title",{boost:200}),this.field("content",{boost:2}),this.field("keywords",{boost:100}),this.metadataWhitelist=["position"],e.forEach((function(e,n){var i={id:n,title:e.title,content:e.content,keywords:e.keywords};t.add(i)}))}))},t.getLunrResult=function(e){return this.lunrIndex.query((function(t){var n=r().tokenizer(e);t.term(n,{boost:10}),t.term(n,{wildcard:r().Query.wildcard.TRAILING})}))},t.getHit=function(e,t,n){return{hierarchy:{lvl0:e.pageTitle||e.title,lvl1:0===e.type?null:e.title},url:e.url,_snippetResult:n?{content:{value:n,matchLevel:"full"}}:null,_highlightResult:{hierarchy:{lvl0:{value:0===e.type?t||e.title:e.pageTitle},lvl1:0===e.type?null:{value:t||e.title}}}}},t.getTitleHit=function(e,t,n){var i=t[0],a=t[0]+n,s=e.title.substring(0,i)+'<span class="algolia-docsearch-suggestion--highlight">'+e.title.substring(i,a)+"</span>"+e.title.substring(a,e.title.length);return this.getHit(e,s)},t.getKeywordHit=function(e,t,n){var i=t[0],a=t[0]+n,s=e.title+"<br /><i>Keywords: "+e.keywords.substring(0,i)+'<span class="algolia-docsearch-suggestion--highlight">'+e.keywords.substring(i,a)+"</span>"+e.keywords.substring(a,e.keywords.length)+"</i>";return this.getHit(e,s)},t.getContentHit=function(e,t){for(var n=t[0],i=t[0]+t[1],a=n,s=i,r=!0,l=!0,o=0;o<3;o++){var c=e.content.lastIndexOf(" ",a-2),u=e.content.lastIndexOf(".",a-2);if(u>0&&u>c){a=u+1,r=!1;break}if(c<0){a=0,r=!1;break}a=c+1}for(var h=0;h<10;h++){var g=e.content.indexOf(" ",s+1),d=e.content.indexOf(".",s+1);if(d>0&&d<g){s=d,l=!1;break}if(g<0){s=e.content.length,l=!1;break}s=g}var p=e.content.substring(a,n);return r&&(p="... "+p),p+='<span class="algolia-docsearch-suggestion--highlight">'+e.content.substring(n,i)+"</span>",p+=e.content.substring(i,s),l&&(p+=" ..."),this.getHit(e,null,p)},t.search=function(e){var t=this;return new Promise((function(n,i){var a=t.getLunrResult(e),s=[];a.length>5&&(a.length=5),t.titleHitsRes=[],t.contentHitsRes=[],a.forEach((function(n){var i=t.searchData[n.ref],a=n.matchData.metadata;for(var r in a)if(a[r].title){if(!t.titleHitsRes.includes(n.ref)){var l=a[r].title.position[0];s.push(t.getTitleHit(i,l,e.length)),t.titleHitsRes.push(n.ref)}}else if(a[r].content){var o=a[r].content.position[0];s.push(t.getContentHit(i,o))}else if(a[r].keywords){var c=a[r].keywords.position[0];s.push(t.getKeywordHit(i,c,e.length)),t.titleHitsRes.push(n.ref)}})),s.length>5&&(s.length=5),n(s)}))},e}();var o=n(6501),c=n.n(o),u="algolia-docsearch",h=u+"-suggestion";const g={suggestion:'\n  <a class="'+h+"\n    {{#isCategoryHeader}}"+h+"__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}"+h+'__secondary{{/isSubCategoryHeader}}\n    "\n    aria-label="Link to the result"\n    href="{{{url}}}"\n    >\n    <div class="'+h+'--category-header">\n        <span class="'+h+'--category-header-lvl0">{{{category}}}</span>\n    </div>\n    <div class="'+h+'--wrapper">\n      <div class="'+h+'--subcategory-column">\n        <span class="'+h+'--subcategory-column-text">{{{subcategory}}}</span>\n      </div>\n      {{#isTextOrSubcategoryNonEmpty}}\n      <div class="'+h+'--content">\n        <div class="'+h+'--subcategory-inline">{{{subcategory}}}</div>\n        <div class="'+h+'--title">{{{title}}}</div>\n        {{#text}}<div class="'+h+'--text">{{{text}}}</div>{{/text}}\n      </div>\n      {{/isTextOrSubcategoryNonEmpty}}\n    </div>\n  </a>\n  ',suggestionSimple:'\n  <div class="'+h+"\n    {{#isCategoryHeader}}"+h+"__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}"+h+'__secondary{{/isSubCategoryHeader}}\n    suggestion-layout-simple\n  ">\n    <div class="'+h+'--category-header">\n        {{^isLvl0}}\n        <span class="'+h+"--category-header-lvl0 "+h+'--category-header-item">{{{category}}}</span>\n          {{^isLvl1}}\n          {{^isLvl1EmptyOrDuplicate}}\n          <span class="'+h+"--category-header-lvl1 "+h+'--category-header-item">\n              {{{subcategory}}}\n          </span>\n          {{/isLvl1EmptyOrDuplicate}}\n          {{/isLvl1}}\n        {{/isLvl0}}\n        <div class="'+h+"--title "+h+'--category-header-item">\n            {{#isLvl2}}\n                {{{title}}}\n            {{/isLvl2}}\n            {{#isLvl1}}\n                {{{subcategory}}}\n            {{/isLvl1}}\n            {{#isLvl0}}\n                {{{category}}}\n            {{/isLvl0}}\n        </div>\n    </div>\n    <div class="'+h+'--wrapper">\n      {{#text}}\n      <div class="'+h+'--content">\n        <div class="'+h+'--text">{{{text}}}</div>\n      </div>\n      {{/text}}\n    </div>\n  </div>\n  ',footer:'\n    <div class="'+(u+"-footer")+'">\n    </div>\n  ',empty:'\n  <div class="'+h+'">\n    <div class="'+h+'--wrapper">\n        <div class="'+h+"--content "+h+'--no-results">\n            <div class="'+h+'--title">\n                <div class="'+h+'--text">\n                    No results found for query <b>"{{query}}"</b>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n  ',searchBox:'\n  <form novalidate="novalidate" onsubmit="return false;" class="searchbox">\n    <div role="search" class="searchbox__wrapper">\n      <input id="docsearch" type="search" name="search" placeholder="Search the docs" autocomplete="off" required="required" class="searchbox__input"/>\n      <button type="submit" title="Submit your search query." class="searchbox__submit" >\n        <svg width=12 height=12 role="img" aria-label="Search">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-search-13"></use>\n        </svg>\n      </button>\n      <button type="reset" title="Clear the search query." class="searchbox__reset hide">\n        <svg width=12 height=12 role="img" aria-label="Reset">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-3"></use>\n        </svg>\n      </button>\n    </div>\n</form>\n\n<div class="svg-icons" style="height: 0; width: 0; position: absolute; visibility: hidden">\n  <svg xmlns="http://www.w3.org/2000/svg">\n    <symbol id="sbx-icon-clear-3" viewBox="0 0 40 40"><path d="M16.228 20L1.886 5.657 0 3.772 3.772 0l1.885 1.886L20 16.228 34.343 1.886 36.228 0 40 3.772l-1.886 1.885L23.772 20l14.342 14.343L40 36.228 36.228 40l-1.885-1.886L20 23.772 5.657 38.114 3.772 40 0 36.228l1.886-1.885L16.228 20z" fill-rule="evenodd"></symbol>\n    <symbol id="sbx-icon-search-13" viewBox="0 0 40 40"><path d="M26.806 29.012a16.312 16.312 0 0 1-10.427 3.746C7.332 32.758 0 25.425 0 16.378 0 7.334 7.333 0 16.38 0c9.045 0 16.378 7.333 16.378 16.38 0 3.96-1.406 7.593-3.746 10.426L39.547 37.34c.607.608.61 1.59-.004 2.203a1.56 1.56 0 0 1-2.202.004L26.807 29.012zm-10.427.627c7.322 0 13.26-5.938 13.26-13.26 0-7.324-5.938-13.26-13.26-13.26-7.324 0-13.26 5.936-13.26 13.26 0 7.322 5.936 13.26 13.26 13.26z" fill-rule="evenodd"></symbol>\n  </svg>\n</div>\n  '};var d=n(9127);const p=n.n(d)();const v={mergeKeyWithParent:function(e,t){if(void 0===e[t])return e;if("object"!=typeof e[t])return e;var n=p.extend({},e,e[t]);return delete n[t],n},groupBy:function(e,t){var n={};return p.each(e,(function(e,i){if(void 0===i[t])throw new Error("[groupBy]: Object has no key "+t);var a=i[t];"string"==typeof a&&(a=a.toLowerCase()),Object.prototype.hasOwnProperty.call(n,a)||(n[a]=[]),n[a].push(i)})),n},values:function(e){return Object.keys(e).map((function(t){return e[t]}))},flatten:function(e){var t=[];return e.forEach((function(e){Array.isArray(e)?e.forEach((function(e){t.push(e)})):t.push(e)})),t},flattenAndFlagFirst:function(e,t){var n=this.values(e).map((function(e){return e.map((function(e,n){return e[t]=0===n,e}))}));return this.flatten(n)},compact:function(e){var t=[];return e.forEach((function(e){e&&t.push(e)})),t},getHighlightedValue:function(e,t){return e._highlightResult&&e._highlightResult.hierarchy_camel&&e._highlightResult.hierarchy_camel[t]&&e._highlightResult.hierarchy_camel[t].matchLevel&&"none"!==e._highlightResult.hierarchy_camel[t].matchLevel&&e._highlightResult.hierarchy_camel[t].value?e._highlightResult.hierarchy_camel[t].value:e._highlightResult&&e._highlightResult&&e._highlightResult[t]&&e._highlightResult[t].value?e._highlightResult[t].value:e[t]},getSnippetedValue:function(e,t){if(!e._snippetResult||!e._snippetResult[t]||!e._snippetResult[t].value)return e[t];var n=e._snippetResult[t].value;return n[0]!==n[0].toUpperCase()&&(n="\u2026"+n),-1===[".","!","?"].indexOf(n[n.length-1])&&(n+="\u2026"),n},deepClone:function(e){return JSON.parse(JSON.stringify(e))}};const f=function(){function e(t){var n=t.searchData,i=t.inputSelector,a=t.debug,s=void 0!==a&&a,r=t.queryDataCallback,o=void 0===r?null:r,u=t.autocompleteOptions,h=void 0===u?{debug:!1,hint:!1,autoselect:!0}:u,d=t.transformData,v=void 0!==d&&d,f=t.queryHook,y=void 0!==f&&f,m=t.handleSelected,b=void 0!==m&&m,w=t.enhancedSearchInput,x=void 0!==w&&w,S=t.layout,_=void 0===S?"collumns":S;e.checkArguments({searchData:n,inputSelector:i}),this.searchData=n,this.input=e.getInputFromSelector(i),this.queryDataCallback=o||null;var H=!(!h||!h.debug)&&h.debug;h.debug=s||H,this.autocompleteOptions=h,this.autocompleteOptions.cssClasses=this.autocompleteOptions.cssClasses||{},this.autocompleteOptions.cssClasses.prefix=this.autocompleteOptions.cssClasses.prefix||"ds";var k=this.input&&"function"==typeof this.input.attr&&this.input.attr("aria-label");this.autocompleteOptions.ariaLabel=this.autocompleteOptions.ariaLabel||k||"search input",this.isSimpleLayout="simple"===_,this.client=new l(this.searchData),x&&(this.input=e.injectSearchBox(this.input)),this.autocomplete=c()(this.input,h,[{source:this.getAutocompleteSource(v,y),templates:{suggestion:e.getSuggestionTemplate(this.isSimpleLayout),footer:g.footer,empty:e.getEmptyTemplate()}}]);var C=b;this.handleSelected=C||this.handleSelected,C&&p(".algolia-autocomplete").on("click",".ds-suggestions a",(function(e){e.preventDefault()})),this.autocomplete.on("autocomplete:selected",this.handleSelected.bind(null,this.autocomplete.autocomplete)),this.autocomplete.on("autocomplete:shown",this.handleShown.bind(null,this.input)),x&&e.bindSearchBoxEvent()}e.checkArguments=function(t){if(!t.searchData)throw new Error("Usage:\n  documentationSearch({\n  searchData,\n  inputSelector,\n  [ appId ],\n  [ autocompleteOptions.{hint,debug} ]\n})");if("string"!=typeof t.inputSelector)throw new Error("Error: inputSelector:"+t.inputSelector+"  must be a string. Each selector must match only one element and separated by ','");if(!e.getInputFromSelector(t.inputSelector))throw new Error("Error: No input element in the page matches "+t.inputSelector)},e.injectSearchBox=function(e){e.before(g.searchBox);var t=e.prev().prev().find("input");return e.remove(),t},e.bindSearchBoxEvent=function(){p('.searchbox [type="reset"]').on("click",(function(){p("input#docsearch").focus(),p(this).addClass("hide"),c().autocomplete.setVal("")})),p("input#docsearch").on("keyup",(function(){var e=document.querySelector("input#docsearch"),t=document.querySelector('.searchbox [type="reset"]');t.className="searchbox__reset",0===e.value.length&&(t.className+=" hide")}))},e.getInputFromSelector=function(e){var t=p(e).filter("input");return t.length?p(t[0]):null};var t=e.prototype;return t.getAutocompleteSource=function(t,n){var i=this;return function(a,s){n&&(a=n(a)||a),i.client.search(a).then((function(n){i.queryDataCallback&&"function"==typeof i.queryDataCallback&&i.queryDataCallback(n),t&&(n=t(n)||n),s(e.formatHits(n))}))}},e.formatHits=function(t){var n=v.deepClone(t).map((function(e){return e._highlightResult&&(e._highlightResult=v.mergeKeyWithParent(e._highlightResult,"hierarchy")),v.mergeKeyWithParent(e,"hierarchy")})),i=v.groupBy(n,"lvl0");return p.each(i,(function(e,t){var n=v.groupBy(t,"lvl1"),a=v.flattenAndFlagFirst(n,"isSubCategoryHeader");i[e]=a})),(i=v.flattenAndFlagFirst(i,"isCategoryHeader")).map((function(t){var n=e.formatURL(t),i=v.getHighlightedValue(t,"lvl0"),a=v.getHighlightedValue(t,"lvl1")||i,s=v.compact([v.getHighlightedValue(t,"lvl2")||a,v.getHighlightedValue(t,"lvl3"),v.getHighlightedValue(t,"lvl4"),v.getHighlightedValue(t,"lvl5"),v.getHighlightedValue(t,"lvl6")]).join('<span class="aa-suggestion-title-separator" aria-hidden="true"> \u203a </span>'),r=v.getSnippetedValue(t,"content"),l=a&&""!==a||s&&""!==s,o=s&&""!==s&&s!==a,c=!o&&a&&""!==a&&a!==i;return{isLvl0:!c&&!o,isLvl1:c,isLvl2:o,isLvl1EmptyOrDuplicate:!a||""===a||a===i,isCategoryHeader:t.isCategoryHeader,isSubCategoryHeader:t.isSubCategoryHeader,isTextOrSubcategoryNonEmpty:l,category:i,subcategory:a,title:s,text:r,url:n}}))},e.formatURL=function(e){var t=e.url,n=e.anchor;return t?-1!==t.indexOf("#")?t:n?e.url+"#"+e.anchor:t:n?"#"+e.anchor:(console.warn("no anchor nor url for : ",JSON.stringify(e)),null)},e.getEmptyTemplate=function(){return function(e){return a().compile(g.empty).render(e)}},e.getSuggestionTemplate=function(e){var t=e?g.suggestionSimple:g.suggestion,n=a().compile(t);return function(e){return n.render(e)}},t.handleSelected=function(e,t,n,i,a){void 0===a&&(a={}),"click"!==a.selectionMethod&&(e.setVal(""),window.location.assign(n.url))},t.handleShown=function(e){var t=e.offset().left+e.width()/2,n=p(document).width()/2;isNaN(n)&&(n=900);var i=t-n>=0?"algolia-autocomplete-right":"algolia-autocomplete-left",a=t-n<0?"algolia-autocomplete-right":"algolia-autocomplete-left",s=p(".algolia-autocomplete");s.hasClass(i)||s.addClass(i),s.hasClass(a)&&s.removeClass(a)},e}()},3953:()=>{}}]);