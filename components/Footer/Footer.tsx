import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yuliia Semochko</p>
          <p>
            Contact me:
            <a href="mailto:yuliiasemochko819@gmail.com">yuliiasemochko819@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
