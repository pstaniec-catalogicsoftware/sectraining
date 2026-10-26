// These SVG fragments are authored locally. No profile or message content is
// interpolated into markup; configurable text is rendered separately as text.
const icons={
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 reply:'<path d="m9 5-6 6 6 6M4 11h9c5 0 7 3 7 8"/>',
 forward:'<path d="m15 5 6 6-6 6M20 11h-9c-5 0-7 3-7 8"/>',
 archive:'<path d="M4 8h16v12H4zM3 4h18v4H3zM9 12h6"/>',
 trash:'<path d="M3 6h18M8 6V3h8v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
 clip:'<path d="m8 12 6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l9-9"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 15c2 0 3 2 3 5"/>',
 calendar:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 11h16M8 15h2M14 15h2"/>',
 folder:'<path d="M3 7V5h7l2 3h9v12H3z"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
 pause:'<path d="M8 5v14M16 5v14"/>',
 check:'<path d="m5 12 4 4L20 5"/>',
 phone:'<path d="m7 3 4 5-3 3c2 3 3 4 6 5l3-3 4 4c-1 4-4 5-7 3C7 17 3 12 3 7c0-2 1-3 4-4Z"/>',
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>'
};
export function icon(name){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.6');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('ui-icon');svg.innerHTML=icons[name]??icons.mail;return svg;
}
const request=`
 <ellipse cx="337" cy="269" rx="254" ry="14" fill="#dfe8dc"/>
 <g class="svg-screen">
  <rect x="103" y="49" width="340" height="201" rx="14" fill="#254946"/>
  <rect x="113" y="60" width="320" height="179" rx="7" fill="#fff"/>
  <path d="M113 85h320" stroke="#e2e8e2"/>
  <circle cx="128" cy="73" r="3" fill="#aebfb4"/><circle cx="139" cy="73" r="3" fill="#c3cfc1"/><circle cx="150" cy="73" r="3" fill="#dae0d4"/>
  <rect x="134" y="106" width="39" height="47" rx="6" fill="#e5eee3"/>
  <path d="M145 119h17m-17 8h17m-17 8h11" stroke="#7b9d88" stroke-width="3" stroke-linecap="round"/>
  <text x="188" y="123" fill="#29493f" font-size="15" font-weight="600">Draft agreement</text>
  <text x="188" y="145" fill="#708277" font-size="11">Shared workspace</text>
  <path d="M135 177h222m-222 13h184m-184 13h205" stroke="#e6ebe4" stroke-width="6" stroke-linecap="round"/>
  <path d="M87 251h371l21 11H66z" fill="#b4c5b6"/><path d="M233 251h82l-8 6h-66z" fill="#8ea795"/>
 </g>
 <g class="svg-arriving-mail">
  <rect x="375" y="93" width="207" height="105" rx="12" fill="#fff" stroke="#c3d2c0"/>
  <rect x="389" y="108" width="34" height="27" rx="5" fill="#edf2e8"/>
  <path d="m394 115 12 9 12-9M394 115v14h24v-14" fill="none" stroke="#467166" stroke-width="2" stroke-linejoin="round"/>
  <text x="435" y="119" font-size="12" fill="#264c43" font-weight="600">Morgan Chen</text>
  <text x="435" y="135" font-size="10" fill="#758478">New message</text>
  <text x="391" y="161" font-size="12" fill="#3c5146">“Could you send me the file?”</text>
  <path d="M391 177h118" stroke="#e7ece2" stroke-width="5" stroke-linecap="round"/>
 </g>
 <g class="svg-clock">
  <circle cx="527" cy="228" r="35" fill="#f2c989" stroke="#e2b16a"/>
  <circle cx="527" cy="228" r="26" fill="#fff7e8"/>
  <path d="M527 211v17l12 7" stroke="#94632b" stroke-width="3" stroke-linecap="round" fill="none" class="svg-clock-hand"/>
  <circle cx="527" cy="228" r="2.5" fill="#94632b"/>
 </g>`;
const verification=`
 <ellipse cx="340" cy="265" rx="255" ry="13" fill="#dfe8dc"/>
 <g class="svg-screen">
  <rect x="88" y="65" width="204" height="174" rx="13" fill="#fff" stroke="#c7d5c3"/>
  <rect x="88" y="65" width="204" height="34" rx="13" fill="#e4ece1"/><path d="M88 87h204v12H88z" fill="#e4ece1"/>
  <text x="105" y="87" fill="#56715c" font-size="11">MESSAGE</text>
  <circle cx="124" cy="131" r="17" fill="#dce7d8"/><text x="113" y="135" fill="#467163" font-size="10" font-weight="600">MC</text>
  <text x="151" y="129" fill="#274b40" font-size="13" font-weight="600">Morgan Chen</text><text x="151" y="146" fill="#7b897c" font-size="10">Familiar display name</text>
  <path d="M107 172h160m-160 13h129" stroke="#e5ebe1" stroke-width="5" stroke-linecap="round"/>
  <rect x="106" y="203" width="133" height="21" rx="10" fill="#fbefd8"/><text x="119" y="217" fill="#986d34" font-size="10">Still needs verification</text>
 </g>
 <path class="svg-route" d="M308 153h59" fill="none" stroke="#628b73" stroke-width="3" stroke-dasharray="70"/><path class="svg-route-tip" d="m358 146 9 7-9 7" fill="none" stroke="#628b73" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
 <g class="svg-destination">
  <rect x="388" y="65" width="204" height="174" rx="13" fill="#234d44"/>
  <text x="405" y="88" fill="#b8d2bc" font-size="11">COMPANY DIRECTORY</text>
  <circle cx="425" cy="131" r="17" fill="#547e64"/><circle cx="425" cy="125" r="5" fill="#d4e6d0"/><path d="M415 141c0-11 20-11 20 0" fill="#d4e6d0"/>
  <text x="451" y="130" fill="#fff" font-size="13" font-weight="600">Morgan Chen</text><text x="451" y="147" fill="#bfd3bd" font-size="10">Existing contact</text>
  <path d="M407 175h161m-161 13h131" stroke="#537969" stroke-width="5" stroke-linecap="round"/>
  <rect x="406" y="204" width="141" height="20" rx="10" fill="#3e6954"/><text x="418" y="218" fill="#e0eada" font-size="10">Open independently</text>
 </g>`;
const reported=`
 <ellipse cx="340" cy="267" rx="245" ry="13" fill="#dfe8dc"/>
 <g class="svg-screen">
  <rect x="117" y="67" width="170" height="178" rx="12" fill="#fff" stroke="#c6d6c1"/>
  <path d="M144 94h44m-44 23h115m-115 13h94m-94 13h109" stroke="#d8e4d4" stroke-width="6" stroke-linecap="round"/>
  <text x="143" y="182" fill="#3b6550" font-size="13" font-weight="600">Something to check</text>
  <text x="143" y="202" fill="#7e8d79" font-size="10">Facts, not guesswork</text>
 </g>
 <path class="svg-route" d="M307 153h64" fill="none" stroke="#6e9277" stroke-width="3" stroke-dasharray="70"/><path d="m362 146 9 7-9 7" fill="none" stroke="#6e9277" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
 <g class="svg-destination">
  <rect x="395" y="90" width="174" height="155" rx="15" fill="#234e44"/>
  <path d="M417 191h38l10 12h34l10-12h38" fill="none" stroke="#88ab8b" stroke-width="3" stroke-linejoin="round"/>
  <text x="432" y="229" fill="#dce8d6" font-size="11">Concern reported</text>
  <circle cx="482" cy="135" r="33" fill="#d7e7cd"/>
  <path class="svg-check" d="m466 135 11 11 22-24" fill="none" stroke="#37684e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="55"/>
 </g>`;
const conversation=`
 <path class="svg-call-line" d="M235 98h210" stroke="#b4ccb3" stroke-width="2" stroke-dasharray="5 7"/>
 <g class="svg-screen"><circle cx="211" cy="98" r="43" fill="#dce9d7"/><circle cx="211" cy="85" r="12" fill="#7b9d7a"/><path d="M186 124c0-29 50-29 50 0" fill="#7b9d7a"/></g>
 <g class="svg-destination"><circle cx="469" cy="98" r="43" fill="#2d5749"/><circle cx="469" cy="85" r="12" fill="#b9d1ae"/><path d="M444 124c0-29 50-29 50 0" fill="#b9d1ae"/></g>
 <g class="svg-phone"><circle cx="340" cy="98" r="25" fill="#fff" stroke="#c8d9bf"/><path d="m329 86 6 8-4 4c3 5 5 7 10 9l4-4 6 6c-2 6-6 7-12 3-10-6-15-13-16-19 0-3 2-6 6-7Z" fill="#527b59"/></g>`;
const artworks={request,verification,reported,conversation};
export function sceneArtwork(kind){
 const frame=document.createElement('div');frame.className=`svg-scene svg-scene-${kind}`;frame.setAttribute('aria-hidden','true');
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',kind==='conversation'?'0 40 680 120':'0 0 680 300');svg.setAttribute('focusable','false');svg.setAttribute('aria-hidden','true');svg.innerHTML=artworks[kind]??artworks.request;frame.append(svg);return frame;
}
