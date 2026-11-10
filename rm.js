/* Replacement Map: personalization + the map data.
   Links carry ?n=<first name>&from=<post>&k=<keyword>. They are kept in localStorage so map.html can
   greet the same person after ClickFunnels redirects (the redirect drops query strings). */
(function () {
  var Q = new URLSearchParams(location.search);
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
                set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var clean = function (s) { return (s || '').replace(/[^\p{L}\p{N} '.-]/gu, '').slice(0, 40).trim(); };
  var n = clean(Q.get('n')) || store.get('rm:n') || '';
  var from = (Q.get('from') || store.get('rm:from') || 'direct').toLowerCase().replace(/[^a-z0-9-]/g, '');
  var k = (Q.get('k') || store.get('rm:k') || 'replace').toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (Q.get('n')) store.set('rm:n', n);
  if (Q.get('from')) store.set('rm:from', from);
  if (Q.get('k')) store.set('rm:k', k);

  // One line per post a lead can come from. The page greets them with the thing they already read.
  var FROM = {
    article:  { hi: 'You read The End Of Designers.', hook: 'Here is the map the article promised: all 8 tools, and the job each one took.' },
    thread:   { hi: 'You read about the intern I fired.', hook: 'The Auto Sorter was tool 01. Here are the other 7.' },
    listicle: { hi: 'You saved the 5 to 15 a day playbook.', hook: 'Step 5 said turn the jobs you repeat into tools. These are the 8 we built.' },
    playbook: { hi: 'You read the Auto Sorter playbook.', hook: 'Step 4 was one tool. This is the whole map it came from.' },
    proof:    { hi: 'You saw 8 designers become 3.', hook: 'This is what the other 5 seats turned into.' },
    taste:    { hi: 'You read the 90/10 post.', hook: 'These 8 tools are the 90%. Here is each one.' },
    dm:       { hi: 'From the DM.', hook: 'As promised: all 8 tools, and the first one to build tonight.' },
    direct:   { hi: '', hook: '' }
  };
  var F = FROM[from] || FROM.direct;

  window.RM = { n: n, from: from, k: k, F: F, TOOLS: [
    { n: '01', name: 'The Auto Sorter', cut: 'the intern', what: 'Connect a Figma file. Every email lands sorted by brand, flow, category, language and year. First real run: 832 templates in one pass.', ws: 'Workshop 01' },
    { n: '02', name: 'The Presenter', cut: "Friday's deck", what: 'Builds the client review deck from the week’s emails: one section per email, the brief beside it, the why under it.' },
    { n: '03', name: 'The Shuffler', cut: 'the first draft', what: 'Rebuilds each brief only from rows the client already approved. Reorder, resize, swap copy. No new elements.' },
    { n: '04', name: 'The Gatekeeper', cut: 'the second look', what: 'Checks every layer before export. On one real file: 209 emails, 173 clean, 36 with the same mistake.' },
    { n: '05', name: 'Brand X Ray', cut: 'the brand audit', what: 'Reads a brand’s past sends into a library: hero signatures, module families, what was used when.' },
    { n: '06', name: 'The Capacity Manual', cut: 'onboarding', what: 'The rules your senior designer carries in their head, written so a new hire ships on day one.' },
    { n: '07', name: 'Studio Of One', cut: 'the org chart', what: 'The agents that plan the week, build the emails and review them, with one human deciding.' },
    { n: '08', name: 'The Content Engine', cut: 'the content team', what: 'One idea in. Email, X, LinkedIn, carousel and video out, in your own voice.' }
  ]};

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-n]').forEach(function (el) { el.textContent = n ? n : el.getAttribute('data-n'); });
    document.querySelectorAll('[data-hi]').forEach(function (el) {
      var line = (n ? n + '. ' : '') + F.hi;
      if (F.hi) { el.textContent = line; el.classList.add('on'); }
    });
    document.querySelectorAll('[data-hook]').forEach(function (el) { if (F.hook) el.textContent = F.hook; });
    document.querySelectorAll('[data-src]').forEach(function (el) { el.value = el.getAttribute('data-src') === 'k' ? k : from; });
    var fn = document.getElementById('first'); if (fn && n && !fn.value) fn.value = n;
  });
})();
