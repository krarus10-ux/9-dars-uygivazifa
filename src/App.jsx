import { useState } from 'react'
import './App.css'

const news = [
  { id: 1, cat: 'Технологии', title: 'Вышла новая версия React', text: 'Разработчики добавили улучшения производительности и новые хуки.' },
  { id: 2, cat: 'Спорт', title: 'Сборная Узбекистана выиграла матч', text: 'Команда уверенно победила со счётом 3:1 и вышла в следующий круг.' },
  { id: 3, cat: 'Экономика', title: 'Курс валют на этой неделе', text: 'Эксперты ожидают стабильный курс в ближайшие дни.' },
  { id: 4, cat: 'Наука', title: 'Учёные нашли новую планету', text: 'Планета находится в обитаемой зоне далёкой звезды.' },
  { id: 5, cat: 'Технологии', title: 'ИИ помогает писать код', text: 'Всё больше программистов используют нейросети в работе.' },
  { id: 6, cat: 'Спорт', title: 'Чемпионат по шахматам стартовал', text: 'В турнире участвуют более ста игроков из разных стран.' },
]

const categories = ['Все', 'Технологии', 'Спорт', 'Экономика', 'Наука']

function App() {
  const [category, setCategory] = useState('Все')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [openId, setOpenId] = useState(null)

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const list = news.filter((n) => {
    if (showFavorites && !favorites.includes(n.id)) return false
    if (category !== 'Все' && n.cat !== category) return false
    return n.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          news<span>line</span>
        </div>
        <button
          className={showFavorites ? 'fav-btn active' : 'fav-btn'}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          ♥ {favorites.length}
        </button>
      </header>

      <input
        className="search"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? 'filter active' : 'filter'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="empty">Ничего нет</p>}

      {list.map((n) => (
        <article
          className="card"
          key={n.id}
          onClick={() => setOpenId(openId === n.id ? null : n.id)}
        >
          <div className="card-head">
            <span className="tag">{n.cat}</span>
            <button
              className={favorites.includes(n.id) ? 'heart on' : 'heart'}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(n.id)
              }}
            >
              ♥
            </button>
          </div>
          <h2>{n.title}</h2>
          {openId === n.id && <p>{n.text}</p>}
        </article>
      ))}
    </div>
  )
}

export default App