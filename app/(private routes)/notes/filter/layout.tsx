'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import css from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeFilter = pathname.split('/').pop() ?? 'All';

  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>

      <div className={css.notesWrapper}>
        <div className={css.filterWrapper}>
          <button className={css.filterToggle} onClick={() => setIsOpen(prev => !prev)}>
            {activeFilter}
            {isOpen ? <IoChevronUpOutline size={14} /> : <IoChevronDownOutline size={14} />}
          </button>

          {isOpen && (
            <>
              <div className={css.backdrop} onClick={() => setIsOpen(false)} />
              <div className={css.dropdown}>
                <div onClick={() => setIsOpen(false)}>{sidebar}</div>
              </div>
            </>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}

export default NotesLayout;
