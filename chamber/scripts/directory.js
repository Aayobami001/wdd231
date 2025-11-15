// responsive nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('primary-nav');

  if (!menuButton || !nav) return;

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
});

// main
document.addEventListener('DOMContentLoaded', () => {
  const dataPath = 'data/members.json';
  const membersContainer = document.getElementById('membersList');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const countNumber = document.getElementById('countNumber');

  let members = [];

  // fetch members JSON with async/await
  async function loadMembers() {
    try {
      const res = await fetch(dataPath);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      members = await res.json();
      renderMembers(members);
      updateCount(members.length);
    } catch (err) {
      membersContainer.innerHTML = `<p class="error">Unable to load members. Please try again later.</p>`;
      console.error(err);
    }
  }

  // render members array into DOM
  function renderMembers(data, view = 'grid') {
    // set container class to reflect view
    membersContainer.classList.remove('grid', 'list');
    membersContainer.classList.add(view);

    // clear container
    membersContainer.innerHTML = '';

    data.forEach(member => {
      const card = document.createElement('article');
      card.className = `member level-${member.membership}`;
      card.setAttribute('tabindex', '0');

      const imgSrc = `images/${member.image}`;
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${member.name} logo`;
      img.loading = 'lazy';
      img.onerror = function(){ this.src = 'images/placeholder-business.png'; };

      const meta = document.createElement('div');
      meta.className = 'meta';

      const name = document.createElement('h3');
      name.textContent = member.name;

      const tag = document.createElement('p');
      tag.className = 'contact';
      tag.innerHTML = `<strong>${member.category}</strong> — ${member.address}`;

      const contact = document.createElement('p');
      contact.className = 'contact';
      contact.innerHTML = `EMAIL: <a href="mailto:info@${member.url.replace(/^https?:\/\//,'')}">info@${member.url.replace(/^https?:\/\//,'')}</a><br/>
                           PHONE: <a href="tel:${member.phone}">${member.phone}</a><br/>
                           URL: <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a>`;

      // description only show in grid (but fine in both)
      const desc = document.createElement('p');
      desc.textContent = member.description;

      meta.appendChild(name);
      meta.appendChild(tag);
      meta.appendChild(contact);
      meta.appendChild(desc);

      card.appendChild(img);
      card.appendChild(meta);
      membersContainer.appendChild(card);
    });
  }

  // update shown count
  function updateCount(n) {
    countNumber.textContent = n;
  }

  // handlers for view toggle
  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed','false');
    renderMembers(members, 'grid');
  });

  listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    listBtn.setAttribute('aria-pressed','true');
    gridBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed','false');
    renderMembers(members, 'list');
  });

  // initial load
  loadMembers();
});

// set current year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified || 'Unknown';
});