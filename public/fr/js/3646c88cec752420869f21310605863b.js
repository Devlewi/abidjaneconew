"use strict";(function(){const TRIGGER_NEXT_FACTOR=0.65;let postsToLoad=[];let mainPostElement;let inViewObserver;let isLoading=!1;let postElements=[];let postElement;function init(){callOnReady(setup)}
function setup(){if(typeof SphereCore_AutoPosts==='undefined'||!window.fetch){return}
postsToLoad=SphereCore_AutoPosts;postElement=document.querySelector('.main');mainPostElement=postElement;postElements.push(mainPostElement);if(!mainPostElement){return}
Object.assign(mainPostElement.dataset,{title:document.title,url:window.location.href});document.addEventListener('scroll',()=>{if(isLoading||postElement.dataset.loading){return}
let triggerLoad=postElement.offsetTop+(postElement.offsetHeight*TRIGGER_NEXT_FACTOR);if(window.scrollY>triggerLoad){isLoading=!0;requestAnimationFrame(loadPost)}});inViewObserver=new IntersectionObserver(observePostsInView,{root:null,rootMargin:'0px 0px -50%',threshold:0})}
function observePostsInView(entries){let thePost;let currentPost;for(let element of entries){if(element.intersectionRatio<=0){currentPost=element.target;continue}
thePost=element.target;break}
if(!thePost){const index=postElements.findIndex(post=>post===currentPost);const prevPost=postElements[index-1];if(prevPost&&prevPost.getBoundingClientRect().bottom>=0){thePost=prevPost}}
if(thePost&&thePost.dataset.url){window.history.pushState(null,thePost.dataset.title,thePost.dataset.url);document.title=thePost.dataset.title;sendPageView()}}
function addLoader(target){target=target||postElement;const loader=document.createElement('div');Object.assign(loader,{className:'spc-alp-loader ts-spinner'});target.after(loader)}
function loadPost(){const post=postsToLoad.shift();if(!post){return}
if(mainPostElement===postElement){mainPostElement.classList.add('spc-alp-main')}
const addPostContainer=(html)=>{if(!html){return}
const parser=new DOMParser();const doc=parser.parseFromString(html,'text/html');const content=doc.querySelector('.main-wrap > .main');if(!content){return}
const container=document.createElement('div');postElement.after(container);Object.assign(container.dataset,{url:post.url,title:post.title,id:post.id});Object.assign(container,{id:`spc-alp-${post.id}`,className:'spc-auto-load-post',innerHTML:content.outerHTML});postElement=container;postElements.push(container);return container};addLoader();fetch(post.url).then(resp=>resp.text()).then(html=>{const container=addPostContainer(html);document.querySelectorAll('.spc-alp-loader').forEach(e=>e.remove());if(!container){return}
executeScripts(container);if(window.twttr&&twttr.widgets&&twttr.widgets.load){twttr.widgets.load()}
requestAnimationFrame(()=>{isLoading=!1;ensureVisible(container);inViewObserver.observe(container);document.dispatchEvent(new Event('spc-alp-loaded'));const theme=Bunyad.theme||Bunyad_Theme;if(theme.reInit){theme.reInit(container)}})})}
function executeScripts(element){let debloatDelay;element.querySelectorAll('script').forEach(item=>{const script=document.createElement('script');script.text=item.textContent;const attrs=item.attributes;for(const attr of attrs){script.setAttribute(attr.name,attr.value||!0)}
if(script.type&&['rocketlazyloadscript','text/debloat-script','/javascript'].includes(script.type)){script.type='text/javascript'}
if(script.dataset.debloatDelay){debloatDelay=!0}
if(!script.src&&script.dataset.src){script.src=script.dataset.src}
document.body.append(script)});if(debloatDelay){document.dispatchEvent(new Event('debloat-load-js'))}}
function ensureVisible(postElement){const doc=document.documentElement;if(doc.scrollHeight-doc.scrollTop<=doc.clientHeight+75){if(Bunyad.theme){Bunyad.theme.stickyBarPause=!0;setTimeout(()=>Bunyad.theme.stickyBarPause=!1,5)}
postElement.scrollIntoView()}}
function sendPageView(){if(!postElement||postElement.dataset.viewTracked){return}
if(window.gtag){window.gtag('event','page_view',{page_title:postElement.dataset.title,page_location:postElement.dataset.url})}
if(window.ga){window.ga('send','pageview',postElement.dataset.url)}
document.dispatchEvent(new CustomEvent('spc-alp-pageview',{detail:{id:postElement.dataset.id,ele:postElement}}));postElement.dataset.viewTracked=1}
function callOnReady(cb){document.readyState!=='loading'?cb():document.addEventListener('DOMContentLoaded',cb)}
init()})()