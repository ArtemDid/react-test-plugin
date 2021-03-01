import StickySlider from './components/StickySlider';
import css from './App.module.scss';

function App() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Test</h1>
      <div className={css.slider}>
        <StickySlider />
      </div>
    </div>
  );
}

export default App;
