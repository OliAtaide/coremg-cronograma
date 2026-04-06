const agenda = [
  {
    data: "08/04/2026",
    hora: "09h",
    publicoAlvo: "Reguladores",
    link: "Em breve"
  },
  {
    data: "13/04/2026",
    hora: "09h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "13/04/2026",
    hora: "14h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "14/04/2026",
    hora: "09h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "14/04/2026",
    hora: "14h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "15/04/2026",
    hora: "14h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "16/04/2026",
    hora: "09h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "16/04/2026",
    hora: "14h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "17/04/2026",
    hora: "09h",
    publicoAlvo: "Reserva / Repescagem",
    link: "Em breve"
  },
  {
    data: "17/04/2026",
    hora: "14h",
    publicoAlvo: "Reserva / Repescagem",
    link: "Em breve"
  },
  {
    data: "20/04/2026",
    hora: "09h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "20/04/2026",
    hora: "14h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "22/04/2026",
    hora: "09h",
    publicoAlvo: "Reguladores",
    link: "Em breve"
  },
  {
    data: "22/04/2026",
    hora: "14h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "23/04/2026",
    hora: "14h",
    publicoAlvo: "Solicitantes",
    link: "Em breve"
  },
  {
    data: "24/04/2026",
    hora: "09h",
    publicoAlvo: "Prestadores",
    link: "Em breve"
  },
  {
    data: "24/04/2026",
    hora: "14h",
    publicoAlvo: "Reguladores",
    link: "Em breve"
  },
  {
    data: "27/04/2026",
    hora: "09h",
    publicoAlvo: "Gestores",
    link: "Em breve"
  },
  {
    data: "27/04/2026",
    hora: "14h",
    publicoAlvo: "Órgãos de controle",
    link: "Em breve"
  },
  {
    data: "28/04/2026",
    hora: "09h",
    publicoAlvo: "Autorizadores",
    link: "Em breve"
  },
  {
    data: "28/04/2026",
    hora: "14h",
    publicoAlvo: "Supervisor de leitos",
    link: "Em breve"
  },
  {
    data: "29/04/2026",
    hora: "09h",
    publicoAlvo: "Gestores",
    link: "Em breve"
  },
  {
    data: "29/04/2026",
    hora: "14h",
    publicoAlvo: "Órgãos de controle",
    link: "Em breve"
  },
  {
    data: "04/05/2026",
    hora: "09h",
    publicoAlvo: "Gestores",
    link: "Em breve"
  },
  {
    data: "04/05/2026",
    hora: "14h",
    publicoAlvo: "Órgãos de controle",
    link: "Em breve"
  },
  {
    data: "05/05/2026",
    hora: "09h",
    publicoAlvo: "Supervisor de leitos",
    link: "Em breve"
  },
  {
    data: "05/05/2026",
    hora: "14h",
    publicoAlvo: "Autorizadores",
    link: "Em breve"
  },
  {
    data: "06/05/2026",
    hora: "09h",
    publicoAlvo: "Autorizadores",
    link: "Em breve"
  },
  {
    data: "06/05/2026",
    hora: "14h",
    publicoAlvo: "Reserva / Repescagem / Reforço para reguladores",
    link: "Em breve"
  }
];

let onlineSwiper = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function chunkArray(items, size) {
  const safeSize = Number(size);

  if (!safeSize || safeSize < 1) {
    return [items];
  }

  const chunks = [];

  for (let index = 0; index < items.length; index += safeSize) {
    chunks.push(items.slice(index, index + safeSize));
  }

  return chunks;
}

function getSelectedRecordsPerPage() {
  const select = document.getElementById("online-records-per-page");

  if (!select) {
    return 10;
  }

  const value = Number.parseInt(select.value, 10);

  if (Number.isNaN(value) || value < 1) {
    return 10;
  }

  return value;
}

function getLinkCellMarkup(link) {
  const safeLink = String(link || "").trim();

  if (!safeLink || safeLink.toLowerCase() === "em breve") {
    return `<span class="online-table__link online-table__link--disabled">Em breve</span>`;
  }

  return `
    <a
      class="online-table__link"
      href="${escapeHtml(safeLink)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Acessar
    </a>
  `;
}

function buildRowsMarkup(items) {
  return items
    .map((item) => {
      return `
        <tr>
          <th scope="row">${escapeHtml(item.data)}</th>
          <td>${escapeHtml(item.hora)}</td>
          <td>${escapeHtml(item.publicoAlvo)}</td>
          <td>${getLinkCellMarkup(item.link)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderOnlineSwiper(items, recordsPerPage) {
  const wrapper = document.getElementById("online-swiper-wrapper");

  if (!wrapper) return;

  const pages = chunkArray(items, recordsPerPage);

  wrapper.innerHTML = pages
    .map((pageItems) => {
      return `
        <div class="swiper-slide">
          <div class="online-table-slide">
            <table class="table table-desktop online-table">
              <colgroup>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <tbody>
                ${buildRowsMarkup(pageItems)}
              </tbody>
            </table>
          </div>
        </div>
      `;
    })
    .join("");
}

function initOnlineSwiper(recordsPerPage) {
  if (onlineSwiper) {
    onlineSwiper.destroy(true, true);
    onlineSwiper = null;
  }

  onlineSwiper = new Swiper("#online-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 500,
    autoHeight: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.custom-navigation-next',
      prevEl: '.custom-navigation-prev',
    },
    on: {
      init(swiper) {
        updateCurrentSlide(swiper);
        updateOnlineSummary(swiper, agenda, recordsPerPage);
      },
      slideChange(swiper) {
        updateCurrentSlide(swiper);
        updateOnlineSummary(swiper, agenda, recordsPerPage);
      }
    }
  });
}

function updateOnlineSummary(swiper, items, recordsPerPage) {
  const summaryElement = document.getElementById("online-summary");

  if (!summaryElement) return;

  const currentPage = swiper.activeIndex + 1;
  const shownCount = Math.min(currentPage * recordsPerPage, items.length);
  const totalCount = items.length;

  summaryElement.textContent = `Mostrando ${shownCount} de ${totalCount} capacitações`;
}

function updateCurrentSlide(swiper) {
  const currentElement = document.querySelector(".current");

  if (!currentElement) return;

  currentElement.textContent = String(swiper.activeIndex + 1).padStart(1, "0");
}

function mountOnlineSwiper() {
  const recordsPerPage = getSelectedRecordsPerPage();

  renderOnlineSwiper(agenda, recordsPerPage);
  initOnlineSwiper(recordsPerPage);
}

document.addEventListener("DOMContentLoaded", function () {
  const recordsSelect = document.getElementById("online-records-per-page");
  const profileTab = document.getElementById("profile-tab");

  mountOnlineSwiper();

  if (recordsSelect) {
    recordsSelect.addEventListener("change", function () {
      mountOnlineSwiper();
    });
  }

  if (profileTab) {
    profileTab.addEventListener("shown.bs.tab", function () {
      if (onlineSwiper) {
        onlineSwiper.update();
      }
    });
  }
});