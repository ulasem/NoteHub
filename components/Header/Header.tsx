'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

import css from './Header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" onClick={closeMenu}>
        NoteHub
      </Link>

      <button
        className={css.burger}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <IoCloseOutline size={26} color="white" />
        ) : (
          <RxHamburgerMenu size={22} color="white" />
        )}
      </button>

      <nav className={`${css.nav} ${isOpen ? css.navOpen : ''}`} aria-label="Main Navigation">
        <ul className={css.navigation} onClick={closeMenu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
