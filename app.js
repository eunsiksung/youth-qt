const date = new Date();
const dateLabel = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(date);
document.querySelector('#todayDate').textContent = dateLabel;

const journal = document.querySelector('#journal');
const charCount = document.querySelector('#charCount');
const saveStatus = document.querySelector('#saveStatus');
const storageKey = `qt-note-${date.toISOString().slice(0, 10)}`;
try { journal.value = localStorage.getItem(storageKey) || ''; } catch (_) { /* storage may be disabled */ }
const updateCount = () => { charCount.textContent = `${journal.value.length} / 300`; };
updateCount();
journal.addEventListener('input', () => {
  if (journal.value.length > 300) journal.value = journal.value.slice(0, 300);
  updateCount();
  try {
    localStorage.setItem(storageKey, journal.value);
    saveStatus.textContent = '저장했어요';
  } catch (_) {
    saveStatus.textContent = '이 브라우저에서는 저장할 수 없어요';
  }
});

