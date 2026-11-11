/* Northstar Services — client-side demonstration app */
(() => {
  "use strict";
  const SERVICES = [
    {id:"home-care",name:"Home care & maintenance",category:"THE HOME",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",alt:"Bright, carefully maintained modern home",description:"Thoughtful help with everyday home repairs, upkeep and small maintenance jobs."},
    {id:"cleaning",name:"Cleaning services",category:"FRESH SPACES",image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85",alt:"Neatly arranged cleaning supplies in a bright room",description:"A fresh start for your space, from regular cleaning to one-time deep cleans."},
    {id:"electrical",name:"Electrical assistance",category:"ELECTRICAL",image:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=85",alt:"Professional electrician working on an installation",description:"Enquiries for lighting, fittings and common electrical maintenance needs."},
    {id:"plumbing",name:"Plumbing support",category:"PLUMBING",image:"https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=85",alt:"Modern chrome tap and clean sink detail",description:"Help with leaks, taps, drainage concerns and other plumbing requests."},
    {id:"moving",name:"Moving & setup",category:"MOVING DAY",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",alt:"Calm, furnished living room ready to be set up",description:"Practical assistance with moving-day tasks, furniture and room setup."},
    {id:"other",name:"Something else",category:"YOUR REQUEST",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",alt:"Welcoming, well-organized workspace",description:"Have a different request? Tell us what you have in mind and we will review it."}
  ];
  const STATUSES = ["New","In Review","In Progress","Resolved","Closed"];
  const STORE_KEY = "northstar_requests_v1";
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const readRequests = () => { try { const data=JSON.parse(localStorage.getItem(STORE_KEY)||"[]"); return Array.isArray(data)?data:[]; } catch { return []; } };
  const saveRequests = requests => localStorage.setItem(STORE_KEY,JSON.stringify(requests));
  const makeReference = () => "NS-" + Math.random().toString(36).slice(2,8).toUpperCase();
  const formatDate = value => new Intl.DateTimeFormat("en",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(value));
  let toastTimer;
  function toast(message){const el=$("#toast");if(!el)return;el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3200);}
  function openModal(id){const el=$("#"+id);if(!el)return;el.hidden=false;document.body.style.overflow="hidden";const focusable=el.querySelector("input,button,select,textarea");setTimeout(()=>focusable?.focus(),50);}
  function closeModal(el){el.hidden=true;document.body.style.overflow="";}
  $$("[data-close-modal]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.closest(".modal-backdrop"))));
  $$(".modal-backdrop").forEach(backdrop=>backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal(backdrop);}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".modal-backdrop:not([hidden])").forEach(closeModal);});
  $$("[data-open-enquiry]").forEach(btn=>btn.addEventListener("click",()=>openEnquiry()));
  $$("[data-open-track]").forEach(btn=>btn.addEventListener("click",()=>openModal("trackModal")));
  const menuToggle=$("#menuToggle"),mainNav=$("#mainNav");
  menuToggle?.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");});
  $$("#mainNav a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");}));
  $("#year") && ($("#year").textContent=new Date().getFullYear());

  // Render service cards from one reusable data source.
  const serviceGrid=$("#serviceGrid");
  if(serviceGrid){
    serviceGrid.innerHTML=SERVICES.map((s,i)=>`<article class="service-card"><div class="service-photo"><img src="${s.image}" alt="${s.alt}" loading="lazy"><span class="service-number">0${i+1}</span></div><div class="service-card-copy"><span class="service-category">${s.category}</span><h3>${s.name}</h3><p>${s.description}</p><button type="button" data-service="${s.id}">Explore this service</button></div></article>`).join("");
    serviceGrid.addEventListener("click",e=>{const btn=e.target.closest("[data-service]");if(!btn)return;openEnquiry(btn.dataset.service);});
  }
  function openEnquiry(serviceId=""){
    const form=$("#enquiryForm");if(!form)return;
    const select=form.elements.service;
    select.innerHTML='<option value="">Choose a service</option>'+SERVICES.map(s=>`<option value="${s.id}">${s.name}</option>`).join("");
    select.value=serviceId;
    form.hidden=false;
    const success=$("#submissionSuccess");if(success)success.hidden=true;
    const alert=$("#enquiryAlert");if(alert)alert.textContent="";
    openModal("enquiryModal");
  }
  function setFieldError(field,message){const label=field.closest("label");const error=label?.querySelector(".field-error");if(error)error.textContent=message;field.setAttribute("aria-invalid",message?"true":"false");}
  function validateEnquiry(form){
    let valid=true;
    const name=form.elements.name,email=form.elements.email,phone=form.elements.phone,service=form.elements.service,details=form.elements.details;
    [name,email,phone,service,details].forEach(f=>setFieldError(f,""));
    if(name.value.trim().length<2){setFieldError(name,"Please enter at least 2 characters.");valid=false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())){setFieldError(email,"Enter a valid email address.");valid=false;}
    if(!/^[+()\d\s.-]{7,20}$/.test(phone.value.trim())){setFieldError(phone,"Enter a valid phone number (7–20 characters).");valid=false;}
    if(!SERVICES.some(s=>s.id===service.value)){setFieldError(service,"Please select a service.");valid=false;}
    if(details.value.trim().length<10){setFieldError(details,"Please add at least 10 characters so we understand your request.");valid=false;}
    return valid;
  }
  const enquiryForm=$("#enquiryForm");
  enquiryForm?.addEventListener("submit",e=>{
    e.preventDefault();const alert=$("#enquiryAlert");alert.textContent="";
    if(!validateEnquiry(enquiryForm)){alert.textContent="Please review the highlighted fields and try again.";return;}
    const data=new FormData(enquiryForm),service=SERVICES.find(s=>s.id===data.get("service"));
    const request={id:makeReference(),name:data.get("name").trim(),email:data.get("email").trim().toLowerCase(),phone:data.get("phone").trim(),serviceId:service.id,service:service.name,location:data.get("location").trim(),details:data.get("details").trim(),status:"New",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),adminNote:""};
    const requests=readRequests();requests.unshift(request);saveRequests(requests);
    enquiryForm.reset();$$(".field-error",enquiryForm).forEach(el=>el.textContent="");
    enquiryForm.hidden=true;
    $("#successReference").textContent=request.id;
    $("#submissionSuccess").hidden=false;
    toast("Your request has been received.");
  });
  enquiryForm?.querySelectorAll("input,select,textarea").forEach(field=>field.addEventListener("input",()=>setFieldError(field,"")));
  $("#copyReference")?.addEventListener("click",async()=>{
    const reference=$("#successReference").textContent;
    try{await navigator.clipboard.writeText(reference);$("#copyReference").innerHTML="Copied ✓";}
    catch{$("#copyReference").textContent="Select and copy the reference above";}
  });

  const trackForm=$("#trackForm");
  trackForm?.addEventListener("submit",e=>{
    e.preventDefault();const alert=$("#trackAlert"),result=$("#trackResult");alert.textContent="";result.hidden=true;
    const reference=trackForm.elements.reference.value.trim().toUpperCase(),email=trackForm.elements.email.value.trim().toLowerCase();
    if(!reference||!email){alert.textContent="Enter both your reference and email address.";return;}
    const request=readRequests().find(r=>String(r.id||"").toUpperCase()===reference&&String(r.email||"").trim().toLowerCase()===email);
    if(!request){alert.textContent="We couldn't match those details. Please check the reference ID and the email address used when submitting the request.";return;}
    const status=request.status||"New";
    const statusMessage=status==="New"?"Your request has been received successfully and is waiting for our team to review it. You do not need to submit it again.":status==="In Review"?"Our team is reviewing your request. We will share an update as soon as the next step is confirmed.":status==="In Progress"?"Your request is currently being worked on by our team.":status==="Resolved"?"Your request has been marked as resolved. Thank you for choosing Northstar.":"This request has been closed. Please contact the team if you need further assistance.";
    result.hidden=false;
    result.innerHTML=`<div class="track-result-top"><span class="track-kicker">REQUEST FOUND</span><span class="status-pill status-${escapeHTML(status.toLowerCase().replaceAll(" ","-"))}">${escapeHTML(status)}</span></div><h3>${escapeHTML(request.service)}</h3><div class="track-reference"><span>REFERENCE ID</span><strong>${escapeHTML(request.id)}</strong></div><p class="track-message">${statusMessage}</p><div class="track-details"><p><span>Submitted</span><strong>${formatDate(request.createdAt)}</strong></p><p><span>Last updated</span><strong>${formatDate(request.updatedAt||request.createdAt)}</strong></p></div>${request.adminNote?`<div class="team-update"><span>UPDATE FROM OUR TEAM</span><p>${escapeHTML(request.adminNote)}</p></div>`:""}`;
  });

  // Team portal demo authentication and request management.
  const loginPanel=$("#loginPanel"),dashboardPanel=$("#dashboardPanel");
  if(loginPanel&&dashboardPanel){
    const DEMO_EMAIL="team@northstar.demo",DEMO_PASSWORD="NorthstarDemo1";
    const loginForm=$("#loginForm");
    loginForm.addEventListener("submit",e=>{
      e.preventDefault();const email=loginForm.elements.email.value.trim(),password=loginForm.elements.password.value;
      if(email===DEMO_EMAIL&&password===DEMO_PASSWORD){sessionStorage.setItem("northstar_demo_session","active");showDashboard();}
      else $("#loginAlert").textContent="The demo email or password is incorrect.";
    });
    function showDashboard(){loginPanel.hidden=true;dashboardPanel.hidden=false;renderDashboard();}
    function showLogin(){sessionStorage.removeItem("northstar_demo_session");dashboardPanel.hidden=true;loginPanel.hidden=false;}
    $("#logoutBtn").addEventListener("click",showLogin);
    if(sessionStorage.getItem("northstar_demo_session")==="active")showDashboard();
    $("#adminSearch").addEventListener("input",renderDashboard);
    $("#statusFilter").addEventListener("change",renderDashboard);
    $("#exportBtn").addEventListener("click",exportCSV);
    $("#requestRows").addEventListener("click",e=>{const btn=e.target.closest("[data-view]");if(btn)showDetails(btn.dataset.view);});
    function renderDashboard(){
      const requests=readRequests(),counts={total:requests.length,new:requests.filter(r=>r.status==="New").length,progress:requests.filter(r=>["In Review","In Progress"].includes(r.status)).length,resolved:requests.filter(r=>["Resolved","Closed"].includes(r.status)).length};
      $("#statsGrid").innerHTML=[["Total requests",counts.total],["New requests",counts.new],["Being handled",counts.progress],["Resolved / closed",counts.resolved]].map(([label,value])=>`<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
      const q=$("#adminSearch").value.trim().toLowerCase(),filter=$("#statusFilter").value;
      const filtered=requests.filter(r=>(filter==="all"||r.status===filter)&&[r.id,r.name,r.email,r.service,r.phone].some(v=>String(v).toLowerCase().includes(q)));
      $("#requestRows").innerHTML=filtered.map(r=>`<tr><td><strong>${escapeHTML(r.id)}</strong><small>${escapeHTML(formatDate(r.createdAt))}</small></td><td><strong>${escapeHTML(r.name)}</strong><small>${escapeHTML(r.email)}</small></td><td>${escapeHTML(r.service)}</td><td>${escapeHTML(formatDate(r.createdAt))}</td><td><span class="status-pill">${escapeHTML(r.status)}</span></td><td><button class="table-action" data-view="${escapeHTML(r.id)}">Review →</button></td></tr>`).join("");
      $("#emptyState").hidden=filtered.length!==0;
    }
    function showDetails(id){
      const request=readRequests().find(r=>r.id===id);if(!request)return;
      $("#detailContent").innerHTML=`<div class="detail-list"><div class="detail-item"><span>Reference</span><strong>${escapeHTML(request.id)}</strong></div><div class="detail-item"><span>Submitted</span><strong>${escapeHTML(formatDate(request.createdAt))}</strong></div><div class="detail-item"><span>Customer</span><strong>${escapeHTML(request.name)}</strong></div><div class="detail-item"><span>Email</span><strong>${escapeHTML(request.email)}</strong></div><div class="detail-item"><span>Phone</span><strong>${escapeHTML(request.phone)}</strong></div><div class="detail-item"><span>Service</span><strong>${escapeHTML(request.service)}</strong></div><div class="detail-item"><span>Location</span><strong>${escapeHTML(request.location||"Not provided")}</strong></div><div class="detail-item detail-wide"><span>Request details</span><strong>${escapeHTML(request.details)}</strong></div></div><form id="updateRequestForm"><label>Update status<select name="status" class="status-select">${STATUSES.map(s=>`<option ${s===request.status?"selected":""}>${s}</option>`).join("")}</select></label><label>Team update / note<textarea name="note" rows="3" maxlength="400" placeholder="Write a short customer-facing update...">${escapeHTML(request.adminNote||"")}</textarea></label><button class="btn btn-dark" type="submit">Save update <span>↗</span></button><div class="form-alert" id="updateAlert" role="alert"></div></form>`;
      openModal("detailModal");
      $("#updateRequestForm").addEventListener("submit",e=>{
        e.preventDefault();const form=e.currentTarget,all=readRequests(),index=all.findIndex(r=>r.id===id);if(index<0)return;
        all[index].status=form.elements.status.value;all[index].adminNote=form.elements.note.value.trim();all[index].updatedAt=new Date().toISOString();saveRequests(all);
        closeModal($("#detailModal"));renderDashboard();toast("Request updated successfully.");
      });
    }
    function exportCSV(){
      const requests=readRequests();if(!requests.length){toast("There are no requests to export yet.");return;}
      const columns=["id","name","email","phone","service","location","details","status","adminNote","createdAt","updatedAt"];
      const quote=value=>'"'+String(value??"").replace(/"/g,'""')+'"';
      const csv=[columns.join(","),...requests.map(r=>columns.map(c=>quote(r[c])).join(","))].join("\r\n");
      const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="northstar-service-requests.csv";a.click();URL.revokeObjectURL(url);toast("CSV export downloaded.");
    }
  }
})();