import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <span className={style.name}>Gorushkin Artyom</span>
      <button className={style.button}>Contact Me!!!!</button>
    </div>
  );
};
