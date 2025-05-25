import{a as f,S as p,i as a}from"./assets/vendor-1AYLTIiv.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",g="50393387-29c967097c23d0e8caeea1a68";function y(i){const r={key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return f.get(m,{params:r}).then(o=>o.data)}const c=document.querySelector(".gallery"),l=document.querySelector("#loader"),h=new p(".gallery a",{captionsData:"alt",captionDelay:250});function b(i){const r=i.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:n,comments:u,downloads:d})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${o}" alt="${e}" loading="lazy" />
      </a>
      <div class="gallery-info">
        <p><b>Likes</b><br />${t}</p>
        <p><b>Views</b><br />${n}</p>
        <p><b>Comments</b><br />${u}</p>
        <p><b>Downloads</b><br />${d}</p>
      </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",r),h.refresh()}function L(){c.innerHTML=""}function S(){l.classList.remove("hidden")}function v(){l.classList.add("hidden")}const w=document.querySelector(".form");w.addEventListener("submit",async i=>{i.preventDefault();const r=i.target.elements["search-text"].value.trim();if(!r){a.warning({message:"Please enter a search term!",position:"topRight"});return}L(),S(),y(r).then(o=>{if(o.hits.length===0){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(o.hits)}).catch(()=>{a.error({message:"Something went wrong. Try again!",position:"topRight"})}).finally(()=>{v()})});
//# sourceMappingURL=index.js.map
