import{a as I,i as p,S}from"./assets/vendor-DFCQGEf1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const M="50500162-d9264b458cdacee071354b362",B="https://pixabay.com/api/";async function y(e,s=1,a=15){const n={key:M,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:a,min_width:640,min_height:480};try{const o=(await I.get(B,{params:n})).data;if(o.hits.length===0)throw new Error("No images found");return o}catch(t){throw t}}function R(e){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          alt="${e.tags}"
          loading="lazy"
        />
        <div class="info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${e.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${e.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${e.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${e.downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `}function v(e,s){const a=e.map(R).join("");s.insertAdjacentHTML("beforeend",a)}function $(e){e.innerHTML=""}function w(e){e.style.display="flex"}function d(e){e.style.display="none"}function c(e){p.error({title:"Error",message:e,position:"topRight",timeout:5e3})}function q(e){p.success({title:"Success",message:e,position:"topRight",timeout:3e3})}function O(e){e.style.display="block"}function L(e){e.style.display="none"}function N(){p.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3})}function _(e){const s=e.querySelector(".gallery-item");if(s){const a=s.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}const b=document.getElementById("search-form"),g=b.querySelector('input[name="searchQuery"]'),u=document.getElementById("gallery"),i=document.getElementById("loader"),f=document.getElementById("load-more-btn");let E="",r=1,l=0;const m=15;let P=new S(".gallery a",{captionsData:"alt",captionDelay:250});b.addEventListener("submit",x);f.addEventListener("click",H);async function x(e){e.preventDefault();const s=g.value.trim();if(!s){c("Please enter a search query!");return}E=s,r=1,l=0,$(u),L(f),w(i);try{const a=await y(s,r,m);d(i),l=a.totalHits,v(a.hits,u),P.refresh(),q(`Found ${l} images!`);const n=Math.ceil(l/m);r<n&&O(f),g.value=""}catch(a){d(i),a.message==="No images found"?c("Sorry, there are no images matching your search query. Please try again!"):(c("Something went wrong. Please try again later."),console.error("Search error:",a))}}async function H(){r+=1,w(i);try{const e=await y(E,r,m);d(i),v(e.hits,u),P.refresh(),_(u);const s=Math.ceil(l/m);r>=s&&(L(f),N())}catch(e){d(i),c("Failed to load more images. Please try again."),console.error("Load more error:",e),r-=1}}
//# sourceMappingURL=index.js.map
