import { Link } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { AppRoute } from '../../const';

function NotFoundPage() {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Main}>
                    На главную
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    Вход
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <section className="page__404" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1>404 — страница не найдена</h1>
            <p>Запрашиваемый адрес не существует или объект был удалён.</p>
            <p>
              <Link to={AppRoute.Main}>Перейти на главную</Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };